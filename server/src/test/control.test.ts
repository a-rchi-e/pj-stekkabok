import express from 'express';
import request from 'supertest';
import router from '../router';
import db from './mockdb';
import path from 'path';
import dotenv from 'dotenv';
import { getFilteredTest1, getFilteredTest2 } from './testExpectations';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Mocking the stripe api call
jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => ({
        checkout: {
            sessions: {
                create: jest.fn().mockResolvedValue({ client_secret: 'test_client_secret' }),
            },
        },
    }));
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}

// testing getAll() function
describe('testing getAll function', () => {
    test('Status code 200 and DB in getAll response', async () => {
        const result = await request(app).get('/rooms');
        expect(result.statusCode).toBe(200);
        expect(result.body).toMatchObject(db);
    });

    test('Status code 404 in getAll response', async () => {
        const result = await request(app).get('/room');
        expect(result.statusCode).toBe(404);
    });
});

// testing updateAvail() function
describe('testing updateAvail function', () => {

    test('Status code 200 in webhook response and if the db has updated booking values', async () => {
        const pid = db[getRandomNumber(db.length - 1)].prod_id;
        const days = [getRandomNumber(10), getRandomNumber(10), getRandomNumber(10)];
        const result = await request(app).post('/webhook').send(
            {
                type: 'checkout.session.completed',
                data: {
                    object: {
                        metadata: {
                            prod_id: pid,
                            daysBooked: JSON.stringify(days)
                        }
                    }
                }
            }
        );
        expect(result.statusCode).toBe(200);
        const result_change = await request(app).get('/rooms');
        const changed_db = result_change.body;
        expect(changed_db.length).toBeGreaterThan(0);
        for (let i = 0; i < changed_db.length; i++) {
            if (changed_db[i].prod_id === pid) {
                const booked = changed_db[i].booked;
                expect(booked.slice(-3)).toMatchObject(days);
            }
        }
    });

    test('Status code 404 in webhook response and if the db has no updated booking values on bad prod_id', async () => {
        const pid = 'wrongpid';
        const days = [getRandomNumber(10), getRandomNumber(10), getRandomNumber(10)];
        const result = await request(app).post('/webhook').send(
            {
                type: 'checkout.session.completed',
                data: {
                    object: {
                        metadata: {
                            prod_id: pid,
                            daysBooked: JSON.stringify(days)
                        }
                    }
                }
            }
        );
        expect(result.statusCode).toBe(404);
        const result_change = await request(app).get('/rooms');
        const changed_db = result_change.body;
        expect(changed_db.length).toBeGreaterThan(0);
        for (let i = 0; i < changed_db.length; i++) {
            if (changed_db[i].prod_id === pid) {
                const booked = changed_db[i].booked;
                expect(booked).toMatchObject(days);
            }
        }
    });
});

// Testing getFiltered() function
describe('testing getFiltered() function', () => {
    test('status code 200', async () => {
        const result = await request(app).post('/test/rooms').send(
            {
                sleeps: 3,
                days: [35, 36, 37, 38]
            }
        );
        expect(result.statusCode).toBe(200);
    });
    test('filtered db returns accurately when days are unbooked for all rooms', async () => {
        const result = await request(app).post('/test/rooms').send(
            {
                sleeps: 3,
                days: [35, 36, 37, 38]
            }
        );
        expect(result.body).toEqual(getFilteredTest1);
    });
    test('filtered db return accurately when days are booked for some rooms', async () => {
        const result = await request(app).post('/test/rooms').send(
            {
                sleeps: 2,
                days: [67, 68, 69, 70]
            }
        );
        expect(result.body).toEqual(getFilteredTest2)
    });
});

// Testing checkout() function

describe('testing checkOut() function', () => {
    test('checking status is 201', async () => {
        const result = await request(app).post('/create-checkout-session').send(
            {
                prod_id: 'prod_RsICHJo7xtpIYR',
                price: 2900000,
                days: [73, 74, 75],
                nights: 3
              }
        )
        expect(result.statusCode).toBe(201)
    })
})