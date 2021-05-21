# How To Run on Local Machine

1. Use `Laravel Sail` to Build and Execute Laravel App in a Docker Container. ([Sail](https://laravel.com/docs/8.x/sail))
2. [Add and start ngrok.](https://www.npmjs.com/package/ngrok#usage) Note: use port 3000 to match Next's server.
    - `npm install ngrok`
    - `ngrok http 80`
3. [Register a draft app.](https://developer.bigcommerce.com/api-docs/apps/quick-start#register-a-draft-app)
    - For steps 5-7, enter callbacks as `'https://{ngrok_id}.ngrok.io/auth/{install||load||uninstall}'`.
    - Get `ngrok_id` from the terminal that's running `ngrok http 80`.
    - e.g. auth callback: `https://12345.ngrok.io/auth/install`
4. `npm install` and then `npm run dev` to compile front end React code using Laravel Mix.
5. Copy .env-example to `.env`.
6. [Replace client_id and client_secret in .env](https://devtools.bigcommerce.com/my/apps) (from `View Client ID` in the dev portal).
7. Update APP_URL and AUTH_CALLBACK in `.env` with the `ngrok_id` from step 5.
8. `sail up` or `./vendor/bin/sail up` to run Laravel project.
9. If for some reason env variables change, clear env cache with command: `sail artisan config:cache`
10. [Install the app and launch.](https://developer.bigcommerce.com/api-docs/apps/quick-start#install-the-app)
