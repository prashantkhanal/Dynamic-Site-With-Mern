const express = require('express');
const { userSignin } = require('../controller/userauth');

const router = express.Router();

router.post('/signin', userSignin);

module.exports = router;
