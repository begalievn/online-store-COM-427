const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registration', userController.registration);
router.get('/login', userController.login);
router.get('/auth', userController.check);

module.exports = router;
