const supertest = require('supertest')
const axios = require('axios')
const mongodb = require('../db/connection');
const app = require('../app')
const makeTest = (method, url)=>{
    const response = supertest(app)[method](url);
    return response;
}
describe('Wishlist', ()=>{
    it ('Checks', async ()=>{
        //supertest(app).get('/wishlist').expect(400)
        jest.spyOn(axios,"get").mockImplementationOnce(()=>{
            return({data:"data"})
        })
        jest.spyOn(mongodb,"getDb").mockImplementationOnce(()=>{
            return(['test'])
        })
        const response = await (makeTest('get','/manager/shelf/'))
        console.log(response);
    })
})
