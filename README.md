#  Apple IAP (In-App Purchase) Receipt Verification

A Node + Express app to verify the receipt of an Apple In-App Purchase.

## Install

You will need to create a `.env` file in the root directory, and specify the following variables:

```
APPLE_APP_STORE_ENVIRONMENT=sandbox
APPLE_SHARED_SECRET=
PORT=3000
```

The `APPLE_SHARED_SECRET` value can be found in App Store Connect > In App Purchase > Manage > App-Specific Shared Secret.

An optional `VERBOSE_LOGGING` environment variable can be set to `true` or `false` to turn on extended server logging. Defaults to `false`.

## :rocket: Start the server

Run `yarn install` then `yarn start`. The server will be available to receive verification requests at `POST /verify`.
