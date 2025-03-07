'use strict';

const express = require('express');
const router = express.Router();
const { getAll, getFiltered, checkOut, updateAvail } = require('./control');

router.get('/rooms', getAll);
router.post('/rooms', getFiltered);
router.post('/create-checkout-session', checkOut); // create stripe session
router.post('/webhook', updateAvail); // webhook endpoint updates room avail. upon payment

module.exports = router;