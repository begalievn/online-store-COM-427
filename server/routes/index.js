const express = require('express');
const router = express.Router();
const deviceRouter = require('./deviceRoute');
const userRouter = require('./userRoute');
const brandRouter = require('./brandRoute');
const typeRouter = require('./typeRoute');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

module.exports = router;


