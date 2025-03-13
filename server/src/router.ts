'use strict';
import express, { Router } from 'express';
import { updateAvail, checkOut, getFiltered, getAll, testGetFiltered } from './control';

const router: Router = express.Router();

router.get('/rooms', getAll); // Params for the function signature are automatically passed by the router
router.post('/rooms', getFiltered);
router.post('/create-checkout-session', checkOut); // create stripe session
router.post('/webhook', updateAvail); // webhook endpoint updates room avail. upon payment

// Test routes

router.post('/test/rooms', testGetFiltered)
// router.post('/test/create-checkout-session', testCheckOut)

export default router;