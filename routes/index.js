const express = require('express');
const router = express.Router();
router.use('/',require('./swagger'))
router.use('/manager',require('./routes.js'))

module.exports = router;