'use strict';
import { Request, Response } from 'express';
import database from './db'; // Reference to DB aka a array
import mockdb from './test/mockdb'
import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// retrieve all rooms
export function getAll(req: Request, res: Response) {
  res.status(200).json(database); // Response to client
  return;
}
// filter rooms by number of guests and availability 
export function getFiltered(req: Request, res: Response) {
  const filteredByBeds = database.filter(room => room.beds >= req.body.sleeps);
  const filteredByDates = filteredByBeds.filter(room => {
    for (let i = 0; i < room.booked.length; i++) {
      if (req.body.days.includes(room.booked[i])) return false;
    }
    return true;
  })
  res.status(200).json(filteredByDates);
}

// create a stripe checkout session
export async function checkOut(req: Request, res: Response) {
  const { prod_id, price, nights, days } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'isk',
            product: prod_id,
            unit_amount: price,
          },
          quantity: nights,
        },
      ],
      // store room id and days booked to update room availability upon payment
      metadata: {
        prod_id: prod_id,
        daysBooked: JSON.stringify(days),
      },
      return_url: 'http://localhost:5173/thanks',
    });
    res.status(201).json({ clientSecret: session.client_secret });
  }
  catch (err) {
    console.log(err);
  }
}

// update room availability
export function updateAvail(req: Request, res: Response) {
  const event = req.body;
  // res.status(200).end(); // should only send 200 if the response is okay in the update path and other codes if prod_id is not matching
  if (event.type === 'checkout.session.completed') {
    // grab custom metadata from session
    let { prod_id, daysBooked } = event.data.object.metadata;
    daysBooked = JSON.parse(daysBooked);
    for (let i = 0; i < database.length; i++) {
      // find the booked room and add new booked days to array
      if (database[i].prod_id === prod_id) {
        database[i].booked = [...database[i].booked, ...daysBooked];
        res.status(200).end();
      }
    }
  }
  res.status(404).end();
}

// Test functions

export function testGetFiltered(req: Request, res: Response) {
  // Using mockdb instead of the main db
  const filteredByBeds = mockdb.filter(room => room.beds >= req.body.sleeps);
  const filteredByDates = filteredByBeds.filter(room => {
    for (let i = 0; i < room.booked.length; i++) {
      if (req.body.days.includes(room.booked[i])) return false;
    }
    return true;
  })
  res.status(200).json(filteredByDates);
}