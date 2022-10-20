const request = require('supertest');
const mongoose = require('mongoose');

const app = require('./app');
require('dotenv').config();

describe('Test the rout GET works', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /manager/wishlist', () => {

        let response;
        beforeEach(async () => {
            response = await request(app).get('/manager/wishlist').send();
        })

        test('The route works', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Return an Array', async () => {
            expect(response.body).toEqual(Array);
        });

    });
  });
