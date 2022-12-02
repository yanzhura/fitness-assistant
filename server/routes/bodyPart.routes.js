const express = require('express');
const BodyPart = require('../models/BodyPart');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const bodyParts = await BodyPart.find();
        res.status(200).send(bodyParts);
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

module.exports = router;
