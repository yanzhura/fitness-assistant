const express = require('express');
const router = express.Router({ mergeParams: true });

const authRoutes = require('./auth.routes');
const bodyPartsRoutes = require('./bodyParts.routes');
const workoutTypesRoutes = require('./workoutTypes.routes');

router.use('/auth', authRoutes);
router.use('/bodyParts', bodyPartsRoutes);
router.use('/workoutTypes', workoutTypesRoutes);

module.exports = router;
