import express from 'express';
import request from 'supertest';
import router from '../router';
import db from './mockdb';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}
// testing getAll() function
describe('testing controller', () => {
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
})
