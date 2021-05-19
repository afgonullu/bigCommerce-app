<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use mysql_xdevapi\Exception;
use Oseintow\Bigcommerce\Bigcommerce;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Bigcommerce\Api\Client as BigcommerceClient;
use Illuminate\Support\Facades\Storage;
use App\Config;  //Database Connection
use Bigcommerce\Api\Connection;

class AppController extends Controller
{
  protected $bigcommerce;
  private $client_id;
  private $client_secret;
  private $access_token;
  private $storehash;
  private $redirect_uri;

  public function __construct(Bigcommerce $bigcommerce)
  {
    $this->bigcommerce = $bigcommerce;
    $this->client_id = env('CLIENT_ID');
    $this->client_secret = env('CLIENT_SECRET');
    $this->redirect_uri = env('AUTH_CALLBACK');
  }

  public function load(Request $request)
  {
    $data = $this->verifySignedRequest($request->get('signed_payload'));
    if (empty($data)) {
      return 'Invalid signed_payload.';
    } else {
      session(['store_hash' => $data['store_hash']]);
    }

    return view('index');
  }

  public function install(Request $request)
  {
    // Make sure all required query params have been passed
    if (!$request->has('code') || !$request->has('scope') || !$request->has('context')) {
      echo 'Not enough information was passed to install this app.';
      // return redirect()->action('MainController@error')->with('error_message', 'Not enough information was passed to install this app.');
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

        // If the merchant installed the app via an external link, redirect back to the 
        // BC installation success page for this app
        if ($request->has('external_install')) {
          return redirect('https://login.bigcommerce.com/app/' . $this->client_id . '/install/succeeded');
        }
      }

      return redirect('/');
    } catch (RequestException $e) {
      $statusCode = $e->getResponse()->getStatusCode();
      $errorMessage = "An error occurred.";

      if ($e->hasResponse()) {
        if ($statusCode != 500) {
          echo "some error other than 500";
          // $errorMessage = Psr7\str($e->getResponse());
        }
      }

      // If the merchant installed the app via an external link, redirect back to the 
      // BC installation failure page for this app
      if ($request->has('external_install')) {
        return redirect('https://login.bigcommerce.com/app/' . $this->getAppClientId() . '/install/failed');
      } else {
        echo "fail";
        // return redirect()->action('MainController@error')->with('error_message', $errorMessage);
      }
    }

    // // Make sure all required query params have been passed
    // if (!$request->has('code') || !$request->has('scope') || !$request->has('context')) {
    //   echo "required query params missing";
    //   // return redirect()->action('MainController@error')->with('error_message', 'Not enough information was passed to install this app.');
    // }

    // $payload = array(
    //   'client_id' => $this->client_id,
    //   'client_secret' => $this->client_secret,
    //   'redirect_uri' => $this->redirect_uri,
    //   'grant_type' => 'authorization_code',
    //   'code' => $request->get('code'),
    //   'scope' => $request->get('scope'),
    //   'context' => $request->get('context'),
    // );

    // $client = new Client(["https://login.bigcommerce.com"]);

    // $resp = $client->post('/oauth2/token', array(), $payload, array(
    //   'exceptions' => false,
    // ));

    // // $req = $client->post('/oauth2/token', array(), $payload, array(
    // //   'exceptions' => false,
    // // ));

    // // $resp = $req->send();

    // // $client = new Client();
    // // $result = $client->request('POST', 'https://login.bigcommerce.com/oauth2/token', [
    // //   'json' => [
    // //     'client_id' => $this->client_id,
    // //     'client_secret' => $this->client_secret,
    // //     'redirect_uri' => $this->redirect_uri,
    // //     'grant_type' => 'authorization_code',
    // //     'code' => $request->input('code'),
    // //     'scope' => $request->input('scope'),
    // //     'context' => $request->input('context'),
    // //   ]
    // // ]);

    // $statusCode = $resp->getStatusCode();
    // $data = json_decode($resp->getBody(), true);

    // if ($statusCode == 200) {
    //   // $data = $resp->getBody();
    //   list($context, $storehash) = explode('/', $data['context'], 2);
    //   $key = $this->getUserKey($storehash, $data['user']['email']);
    //   $access_token = $data['access_token'];
    //   $storeHash = $data['context'];
    //   $array = explode('/', $storeHash);
    //   $storehash = $array[1];
    //   $email = $data['user']['email'];

    //   $request->session()->put('store_hash', $data['context']);
    //   $request->session()->put('access_token', $data['access_token']);
    //   $request->session()->put('user_id', $data['user']['id']);
    //   $request->session()->put('user_email', $data['user']['email']);
    //   // $configValue = Config::select('*')->where('storehash', $storehash)->get()->toArray();

    //   // if (count($configValue) != 0) {
    //   //   $id = $configValue[0]['id'];
    //   //   $configObj = Config::find($id);
    //   //   $configObj->access_token = $access_token;
    //   //   $configObj->save();
    //   // } else {
    //   //   $configObj = new Config;
    //   //   $configObj->email = $email;
    //   //   $configObj->storehash = $storehash;
    //   //   $configObj->access_token = $access_token;
    //   //   $configObj->save();
    //   // }
    // }

    // if ($access_token != '') {
    //   return 'App Installed Successfully, Reload the page. ';
    // } else {
    //   return 'Something went wrong... [' . $resp->getStatusCode() . '] ' . $resp->getBody();
    // }
    return view('index');
  }

  public function verifySignedRequest($signedRequest)
  {
    list($encodedData, $encodedSignature) = explode('.', $signedRequest, 2);
    $client_secret = $this->client_secret;
    // decode the data
    $signature = base64_decode($encodedSignature);
    $jsonStr = base64_decode($encodedData);
    $data = json_decode($jsonStr, true);
    // confirm the signature
    $expectedSignature = hash_hmac('sha256', $jsonStr, $client_secret, $raw = false);
    if (!hash_equals($expectedSignature, $signature)) {
      error_log('Bad signed request from BigCommerce!');
      return null;
    }
    return $data;
  }
}
