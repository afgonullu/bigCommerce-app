<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Oseintow\Bigcommerce\Bigcommerce;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class AppController extends Controller
{
  protected $bigcommerce;
  private $client_id;
  private $client_secret;
  private $redirect_uri;

  public function __construct(Bigcommerce $bigcommerce)
  {
    $this->bigcommerce = $bigcommerce;
    $this->client_id = \config('app.clientId');
    $this->client_secret = \config('app.clientSecret');
    $this->redirect_uri = \config('app.authCallback');
  }

  public function getAppClientId()
  {
    if (\config('app.appEnv') === 'local') {
      return \config('app.localClientId');
    } else {
      return \config('app.clientId');
    }
  }

  public function getAppSecret()
  {
    if (\config('app.appEnv') === 'local') {
      return \config('app.localClientSecret');
    } else {
      return \config('app.clientSecret');
    }
  }

  public function getAccessToken(Request $request)
  {
    if (\config('app.appEnv') === 'local') {
      return \config('app.localAccessToken');
    } else {
      $store = DB::table('app_users')
        ->where('store_hash', '=', $request->session()->get('store_hash'))
        ->get();
      return Arr::first($store)->access_token;
    }
  }

  public function getStoreHash(Request $request)
  {
    if (\config('app.appEnv') === 'local') {
      return \config('app.localStoreHash');
    } else {
      return $request->session()->get('store_hash');
    }
  }

  public function error(Request $request)
  {
    $errorMessage = "Internal Application Error";

    if ($request->session()->has('error_message')) {
      $errorMessage = $request->session()->get('error_message');
    }

    echo '<h4>An issue has occurred:</h4> <p>' . $errorMessage . '</p> <a href="' . \config('app.appUrl') . '">Go back to home</a>';
  }

  public function load(Request $request)
  {
    $signedPayload = $request->get('signed_payload');
    if (!empty($signedPayload)) {
      $verifiedSignedRequestData = $this->verifySignedRequest($signedPayload);
      if ($verifiedSignedRequestData !== null) {

        $request->session()->put('user_id', $verifiedSignedRequestData['user']['id']);
        $request->session()->put('user_email', $verifiedSignedRequestData['user']['email']);
        $request->session()->put('owner_id', $verifiedSignedRequestData['owner']['id']);
        $request->session()->put('owner_email', $verifiedSignedRequestData['owner']['email']);
        $request->session()->put('store_hash', $verifiedSignedRequestData['context']);
      } else {
        return "The signed request from BigCommerce could not be validated.";
        // return redirect()->action([AppController::class, 'error'])->with('error_message', 'The signed request from BigCommerce could not be validated.');
      }
    } else {
      return "The signed request from BigCommerce was empty.";
      // return redirect()->action([AppController::class, 'error'])->with('error_message', 'The signed request from BigCommerce was empty.');
    }

    return redirect(\config('app.appUrl'));
  }

  public function install(Request $request)
  {
    // Make sure all required query params have been passed
    if (!$request->has('code') || !$request->has('scope') || !$request->has('context')) {
      echo 'Not enough information was passed to install this app.';
      // return redirect()->action([AppController::class, 'error'])->with('error_message', 'Not enough information was passed to install this app.');
    }

    try {
      $client = new Client();
      $result = $client->request('POST', 'https://login.bigcommerce.com/oauth2/token', [
        'json' => [
          'client_id' => $this->client_id,
          'client_secret' => $this->client_secret,
          'redirect_uri' => $this->redirect_uri,
          'grant_type' => 'authorization_code',
          'code' => $request->input('code'),
          'scope' => $request->input('scope'),
          'context' => $request->input('context'),
        ]
      ]);

      $statusCode = $result->getStatusCode();
      $data = json_decode($result->getBody(), true);

      if ($statusCode == 200) {
        $request->session()->put('store_hash', $data['context']);
        $request->session()->put('access_token', $data['access_token']);
        $request->session()->put('user_id', $data['user']['id']);
        $request->session()->put('user_email', $data['user']['email']);

        $store = DB::table('app_users')
          ->where('store_hash', '=', $data['context'])
          ->get();

        if (count($store) > 0) {
          $ref = DB::table('app_users')->where('store_hash', '=', $data['context'])->update(
            ['user_id' => $data['user']['id'], 'store_hash' => $data['context'], 'access_token' => $data['access_token'], 'user_email' => $data['user']['email']]
          );
        } else {
          $ref = DB::table('app_users')->insert(
            ['user_id' => $data['user']['id'], 'store_hash' => $data['context'], 'access_token' => $data['access_token'], 'user_email' => $data['user']['email']]
          );
        }

        // If the merchant installed the app via an external link, redirect back to the 
        // BC installation success page for this app
        if ($request->has('external_install')) {
          return redirect('https://login.bigcommerce.com/app/' . $this->getAppClientId() . '/install/succeeded');
        }
      }

      return redirect(\config('app.appUrl'));
      // return redirect('/');
    } catch (RequestException $e) {
      $statusCode = $e->getResponse()->getStatusCode();
      $errorMessage = "An error occurred.";

      if ($e->hasResponse()) {
        if ($statusCode != 500) {
          // echo "some error other than 500";
          // var_dump($e->getResponse());
          $errorMessage = Message::toString($e->getResponse());
        }
      }

      // If the merchant installed the app via an external link, redirect back to the 
      // BC installation failure page for this app
      if ($request->has('external_install')) {
        return redirect('https://login.bigcommerce.com/app/' . $this->getAppClientId() . '/install/failed');
      } else {
        echo $errorMessage;
        // return redirect()->action([AppController::class, 'error'])->with('error_message', $errorMessage);
      }
    }
    // return view('index');
  }

  public function verifySignedRequest($signedRequest)
  {
    list($encodedData, $encodedSignature) = explode('.', $signedRequest, 2);

    // decode the data
    $signature = base64_decode($encodedSignature);
    $jsonStr = base64_decode($encodedData);
    $data = json_decode($jsonStr, true);

    // confirm the signature
    $expectedSignature = hash_hmac('sha256', $jsonStr, $this->client_secret, $raw = false);
    if (!hash_equals($expectedSignature, $signature)) {
      error_log('Bad signed request from BigCommerce!');
      return null;
    }
    return $data;
  }

  public function makeBigCommerceAPIRequest(Request $request, $endpoint)
  {
    $requestConfig = [
      'headers' => [
        'X-Auth-Client' => $this->getAppClientId(),
        'X-Auth-Token'  => $this->getAccessToken($request),
        'Content-Type'  => 'application/json',
      ]
    ];

    if ($request->method() === 'PUT') {
      $requestConfig['body'] = $request->getContent();
    }

    $client = new Client();
    $result = $client->request($request->method(), 'https://api.bigcommerce.com/' . $this->getStoreHash($request) . '/' . $endpoint, $requestConfig);
    return $result;
  }

  public function proxyBigCommerceAPIRequest(Request $request, $endpoint)
  {
    if (strrpos($endpoint, 'v2') !== false) {
      // For v2 endpoints, add a .json to the end of each endpoint, to normalize against the v3 API standards
      $endpoint .= '.json';
    }

    $result = $this->makeBigCommerceAPIRequest($request, $endpoint);

    return response($result->getBody(), $result->getStatusCode())->header('Content-Type', 'application/json');
  }
}
