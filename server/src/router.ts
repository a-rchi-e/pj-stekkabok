'use strict';
import express, { Router } from 'express';
import getAll from './control';
import getFiltered from './control';
import checkOut from './control';
import updateAvail from './control';

const router: Router = express.Router();

router.get('/rooms', getAll);
router.post('/rooms', getFiltered);
router.post('/create-checkout-session', checkOut); // create stripe session
router.post('/webhook', updateAvail); // webhook endpoint updates room avail. upon payment

export default router;