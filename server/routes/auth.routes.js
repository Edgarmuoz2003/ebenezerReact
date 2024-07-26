const express = require('express');
const router = express.Router();
const loginCrls = require('../controllers/auth.controllers');

router.post('/login', loginCrls.login);
router.post('/register', loginCrls.createUser);

module.exports = router;