const express = require('express');
const bodyParser = require('body-parser');

const server = express()

server
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next();
})
.use('/',require('./routes'));

module.exports = server;
