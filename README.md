**SET UP**


*Environment Variables*

You'll need a Stripe account. Get into test mode and grab your public ('publishable') and private ('secret') keys from the API section.

Create a .env file at the root of your SERVER folder and put your PRIVATE key there, so that it  can be accessed l.7 of control.js.

Create a .env file at the root of your CLIENT folder and put your PUBLIC key there, so that it  can be accessed l.11 of Payment.jsx. If you're using Vite, the variable name must start with 'VITE_'.


*Dependencies*

Get into the server folder:
- run `npm i` to install dependencies
- then run `node index.js` to start the server

Get into the client folder:
- run `npm i` to install dependencies
- then run `npm run dev` to start the client


Message me if you need anything.

npm init -y // fuer die initialisierung von package.json npm install express 
npm install -D express 
npm install -D typescript 
npm install express sequelize typescript @types/express @types/node pg pg-hstore 
npm install -D typescript @types/express @types/node ts-node nodemon 
tsc --init // creating a tsconfig.json file with all recommended environment settings