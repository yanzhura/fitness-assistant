const express = require('express');
const WorkoutType = require('../models/WorkoutType');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const workoutTypes = await WorkoutType.find();
        res.status(200).send(workoutTypes);
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

module.exports = router;
