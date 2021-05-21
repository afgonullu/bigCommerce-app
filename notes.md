## Steps from Scratch

1. Create Laravel Project
   laravel docs, docker
   curl -s https://laravel.build/bigCommerce-app | bash

2. Change ui to React
   sail composer require laravel/ui
   sail artisan ui react
   npm install

    npm run dev

3. Change File Naming Convention to Suit React
   web.php return index view at /
   webpack.mix.js points to index.js
   create index.blade.php with div#root and script src mix index.js
   change app.js -> index.js

    a. React Router
    npm install --save react-router-dom
    check commit "react router"
    npm run dev

4. Ngrok
   `ngrok http 80`
   copy https tunnel addres to env (APP_URL, AUTH_CALLBACK) and bigcommerce app callback routes.

5. Create App On Dashboard
   create app with ngrok https tunnel address.

6. .env
   copy app client id and secret to env

7. Routes & Controller
   install a forked package for bigcommerce, change composer.json as in commit "install bigCommerce Package", then `sail composer update`
   package doc is here: https://github.com/oseintow/laravel-bigcommerce
   add alias and facades for bigcommerce package to config/app.php
   `sail artisan publish` -> generates a bigcommerce.php in config. add env. keys to bigcommerce.php

    check commit "basic configuration, routes and controller"

https://www.dckap.com/blog/create-an-app-in-bigcommerce-using-laravel/
https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006
