const express = require('express');
const bodyParser = require('body-parser');
const appleReceiptVerify = require('node-apple-receipt-verify');

require('dotenv').config();

const environment = process.env.APPLE_APP_STORE_ENVIRONMENT;
const secret = process.env.APPLE_SHARED_SECRET;
const verboseLogging = process.env.VERBOSE_LOGGING
  ? process.env.VERBOSE_LOGGING === 'true'
  : false;

const app = express();
const port = process.env.PORT || 3000;

appleReceiptVerify.config({
  environment: [environment],
  excludeOldTransactions: true,
  extended: true,
  secret,
  verbose: verboseLogging,
});

app.use(bodyParser.json());

app.post('/verify', async (req, res, next) => {
  console.log(req.body);
  try {
    const { body } = req;
    const { receipt } = body;

    /**
     * Attempt to verify the transaction receipt.
     */
    const products = await appleReceiptVerify.validate({
      excludeOldTransactions: true,
      receipt: receipt,
    });

    /**
     * Check for product presence.
     */
    if (Array.isArray(products)) {
      /**
       * Get the latest purchased product.
       */
      let { expirationDate } = products[0];

      return res.status(200).json({
        environment,
        expirationDate,
        products,
        status: 'success',
        verified: true,
      });
    }
  } catch (error) {
    /**
     * The transaction receipt is not valid.
     */
    return res.status(403).json({
      error: error,
      message: error.message,
      status: 'error',
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
