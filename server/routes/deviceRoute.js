const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.put('/rating/:id/user/:userId', deviceController.addRating);
router.get('/basket/:id', deviceController.getFromBasket)

module.exports = router;
