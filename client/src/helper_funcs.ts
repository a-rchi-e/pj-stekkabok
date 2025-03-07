// ------- HELPER FUNCTIONS -------

import { DateTime } from 'luxon';
import { Room, Booking, CheckoutReq }from './interfaces'


// turn a date into an ordinal
function toOrdinal(date: string): number {
  const dateArgs: number[] = date.split('-').map(str => parseInt(str)); // turns date as returned by form ('2025-02-04') into array of integers, that can be spread into a series of arguments for the DateTime constructor
  return DateTime.local(dateArgs[0], dateArgs[1], dateArgs[2]).ordinal; // turns array of date components into an ordinal
}

// retrieve all rooms
async function getAllRooms(): Promise<Room[] | undefined> {
  try {
    const response = await fetch('http://localhost:3000/rooms',
      {method: 'GET', headers: {"Content-Type": "application/json"}});
    if (!response.ok) throw new Error ('error retrieving room list.');
    const rooms: Room[] = await response.json();
    return rooms;
  }
  catch (err) {
    console.log(err);
  }
}

// retrieve available rooms
async function getAvailableRooms (request: Booking): Promise<Room[] | undefined> {
  try {
    const response = await fetch('http://localhost:3000/rooms',
      {method: 'POST', body: JSON.stringify(request), headers: {"Content-Type": "application/json"}});
    if (!response.ok) throw new Error ('error retrieving room list.');
    const rooms: Room[] = await response.json();
    return rooms;
  }
  catch (err) {
    console.log(err);
  }
}

// send stripe checkout request
async function requestCheckout (roomData: Room): Promise<string | undefined> {
  try {
    const response = await fetch('http://localhost:3000/create-checkout-session',
      {method: 'POST', body: JSON.stringify(roomData), headers: {"Content-Type": "application/json"}});
    if (!response.ok) throw new Error ('error sending checkout request.');
    else {
      const { clientSecret }: CheckoutReq = await response.json();
      return clientSecret;
    }
  }
  catch (err) {
    console.log(err);
  }
}

export { toOrdinal, getAllRooms, getAvailableRooms, requestCheckout };