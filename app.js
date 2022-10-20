const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        );
        next();
    })
    .use('/', require('./routes'));

module.exports = app;