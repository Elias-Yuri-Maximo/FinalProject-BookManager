//const { MongoClient } = require('mongodb');
const request = require('supertest');
const app = require('../app')
// const dotenv = require('dotenv');

// dotenv.config();

describe('Test wishlist', () => {

    // let connection;
    // let db;

    // beforeAll(async () => {
    //     connection = await MongoClient.connect(globalThis.process.env.MONGODB_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     });
    //     db = await connection.db(globalThis.books_db);
    // });

    // afterAll(async () => {
    //     await connection.close();
    // });

    describe('GET /manager/wishlist', () => {

        let response;

        beforeEach(async () => {
            response = await request(app).get('/manager/wishlist').send();
        });

        test('The route works', async () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        test('if it should return an array', async () =>{
            expect(response.body).toBeInstanceOf(Array);
        });

    });
});

// const {MongoClient} = require('mongodb');

// describe('insert', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(globalThis.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users');

//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({_id: 'some-user-id'});
//     expect(insertedUser).toEqual(mockUser);
//   });
// });
