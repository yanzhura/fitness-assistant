const express = require('express');
const router = express.Router({ mergeParams: true });

const authRoutes = require('./auth.routes');
const bodyPartRoutes = require('./bodyPart.routes');
const workoutTypeRoutes = require('./workoutType.routes');
const userRoutes = require('./user.routes')

router.use('/auth', authRoutes);
router.use('/bodyPart', bodyPartRoutes);
router.use('/workoutType', workoutTypeRoutes);
router.use('/user', userRoutes);

module.exports = router;
