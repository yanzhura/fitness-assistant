const express = require('express');
const Exercise = require('../models/Exercise');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.get('/:exerciseId', async (req, res) => {
    try {
        const { exerciseId } = req.params;
        const exercise = await Exercise.findOne({ _id: exerciseId });
        res.status(200).send(exercise);
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).send(exercises);
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

module.exports = router;
