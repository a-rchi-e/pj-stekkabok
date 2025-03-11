**SET UP**


*Environment Variables*

You'll need a Stripe account.

Get into test mode, then 'Developers' tab (bottom left) and 'API Keys', and grab your public ('publishable') and private ('secret') keys.

Create a .env file at the root of your SERVER folder and put your PRIVATE key there, so that it  can be accessed l.7 of control.js.

Create a .env file at the root of your CLIENT folder and put your PUBLIC key there, so that it  can be accessed l.11 of Payment.jsx. If you're using Vite, the variable name must start with 'VITE_'.


*Dependencies*

Get into the server folder:
- run `npm i` to install dependencies
- then run `node index.js` to start the server

Get into the client folder:
- run `npm i` to install dependencies
- then run `npm run dev` to start the client

For the webhook endpoint to function, you'll need to install the Stripe CLI (https://docs.stripe.com/stripe-cli) and set up a listener (https://docs.stripe.com/webhooks, see '2. Test your handler).


Message me if you need anything!