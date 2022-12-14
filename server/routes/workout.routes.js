const express = require('express');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.get('/:workoutNumber', async (req, res) => {
    try {
        const { workoutNumber } = req.params;
        const workout = await Workout.findOne({ sequenceNumber: parseInt(workoutNumber) });
        res.status(200).send(workout);
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ sequenceNumber: 1 });
        res.status(200).send(workouts);
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

module.exports = router;
