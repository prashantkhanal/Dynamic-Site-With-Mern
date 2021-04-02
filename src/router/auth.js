const express = require('express');
const { userAuth } = require('../controller/userauth');

const router = express.Router();

router.post('/register', userAuth);

module.exports = router;
