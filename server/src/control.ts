'use strict';
import { Request, Response } from 'express';
import database from './db';
import dotenv from 'dotenv';
import {Room} from './interfaces';
import {CheckoutReq} from './interfaces';
import { Booking } from './interfaces';

dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// retrieve all rooms
 function getAll(database:Room[], req: Request, res: Response) {
  try {
    const allRooms =  res.json({database});
    if(!res.status.ok) {
      throw new Error ('error retrieving all the rooms from the database')
    }
    return allRooms;

  } catch (error) {
    console.log(error);
    res.status(400).json({error: error})
  }
}

// filter rooms by number of guests and availability
function getFiltered( database: Room[], req: Booking, res: Response) {
  const filteredByBeds = database.filter(room => room.beds >= req.beds);
  const filteredByDates = filteredByBeds.filter(room => {
    for (let i = 0; i < room.booked.length; i++) {
      if (req.days.includes(room.booked[i])) return false;
    }
    return true;
  })
  res.json(filteredByDates);
}

// create a stripe checkout session
async function checkOut(req: Request, res: Response) {
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
function updateAvail(req: Request, res: Request) {
  const event = req.body;
  res.status(200).end();
  if (event.type === 'checkout.session.completed') {
    // grab custom metadata from session
    let { prod_id, daysBooked } = event.data.object.metadata;
    daysBooked = JSON.parse(daysBooked);
    for (let i = 0; i < database.length; i++) {
      // find the booked room and add new booked days to array
      if (database[i].prod_id === prod_id) {
        database[i].booked = [...database[i].booked, ...daysBooked];
      }
    }
  }
}

export default { getAll, getFiltered, checkOut, updateAvail };