<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Bigcommerce Api
    |--------------------------------------------------------------------------
    |
    | This file is for setting the credentials for bigcommerce api key and secret.
    |
    */
    'default' => env("BC_CONNECTION", 'oAuth'),

    'basicAuth' => [
        'store_url' => env("BC_STORE_URL", null),
        'username' => env("BC_USERNAME", null),
        'api_key' => env("BC_API_KEY", null),
    ],

    'oAuth' => [
        'client_id' => env("CLIENT_ID", null),
        'client_secret' => env("CLIENT_SECRET", null),
        'redirect_url' => env("AUTH_CALLBACK", null),
    ],
];
