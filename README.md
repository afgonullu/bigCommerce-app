# How To Run on Local Machine

1. Use `Laravel Sail` to Build and Execute Laravel App in a Docker Container. ([Sail](https://laravel.com/docs/8.x/sail))
2. [Add and start ngrok.](https://www.npmjs.com/package/ngrok#usage) Note: use port 80 to match Laravel server.
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
8. To initialize database tables, run `sail artisan migrate`
9. `sail up` or `./vendor/bin/sail up` to run Laravel project.
10. If for some reason env variables change, clear env cache with command: `sail artisan config:cache`
11. [Install the app and launch.](https://developer.bigcommerce.com/api-docs/apps/quick-start#install-the-app)
12. App uses cookie based session to pass over some data, also a mysql database configured in the laravel sail project to store access tokens for registered stores. access tokens currently are not hashed in the database.

### Notes on Local Development

-   For faster development in local machine, you can use local credentials. For that, you should set the following `APP_ENV` environment variable to `local`. This will cause the app to use the local API credentials:  
    e.g. `APP_ENV=local`

-   In order to work in local, you should also set store API credentials in the .env. You can generate API credentials in your store dashboard `Advanced Settings->API Accounts->Create V2/V3 API Token` (You need to select Information&Settings scope readonly and other scopes that you need for your app's functionality)

Below is an example of how these environment variables should look like.

```
# LOCAL
L_ACCESS_TOKEN=5ves21xef52y7kttyd0gm8c50yjy2zx
L_API_PATH=https://api.bigcommerce.com/stores/lrtom86d1e/v3/
L_CLIENT_ID=mbfav830kuwwr0toh07p4kppog5cco9
L_CLIENT_SECRET=b8d4c1ab541dee283b6871e96f2f96e6dc0610073acec6d650e4eeb197ad5a3f
L_STORE_HASH=stores/lrtom86d1e
```
