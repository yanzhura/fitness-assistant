const express = require('express');
const router = express.Router({ mergeParams: true });

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const workoutRoutes = require('./workout.routes');
const exerciseRoutes = require('./exercise.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/workout', workoutRoutes);
router.use('/exercise', exerciseRoutes);

module.exports = router;
