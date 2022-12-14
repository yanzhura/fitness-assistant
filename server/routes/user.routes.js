const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.patch('/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            res.status(200).send(updatedUser);
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

router.get('/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === req.user._id) {
            const user = await User.findOne({ _id: userId });
            res.status(200).send(user);
        } else {
            res.status(401).json({
                message: 'Unauthorized from router.get(/:userId)'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error. Try again later'
        });
    }
});

module.exports = router;
