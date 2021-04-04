const express = require('express');
const { userSignup } = require('../controller/userauth');

const router = express.Router();

router.post('/signup', userSignup);

module.exports = router;
