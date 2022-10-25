const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')
const server = express()

server
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next();
})
.use(routes);

module.exports= server;
