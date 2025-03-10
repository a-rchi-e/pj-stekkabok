'use strict';
import express, { Application } from 'express';
import cors from 'cors';
import router from './router'

const app: Application = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use('/', router);

function startServer() {
  try {
    app.listen(port, () => {
      console.log(`The server is now running at http://localhost:${port}.`);
    });

  } catch (error) {
    console.log(error);
  }
}

startServer();

export default app; // changed to app to avoid multiple server starts with test frameworks
