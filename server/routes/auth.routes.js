const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const tokenService = require('../services/token.service');
const { check, validationResult } = require('express-validator');

const router = express.Router({ mergeParams: true });

router.post('/signUp', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    async (req, res) => {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400
                        // errors: validationErrors.array()
                    }
                });
            }
            const { email, password } = req.body;
            const exeistingUser = await User.findOne({ email });
            if (exeistingUser) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_EXISTS',
                        code: 400
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            console.log('hashedPassword', hashedPassword);
            const newUser = await User.create({
                ...req.body,
                password: hashedPassword,
                completedWorkouts: 0,
                currentWorkout: 1,
                trainingFinishedAt: null,
                trainingStartedAt: null
            });
            console.log('newUser', newUser);

            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({
                ...tokens,
                userId: newUser._id
            });
        } catch (error) {
            res.status(500).json({
                message: '500 Server Error. Try again later'
            });
        }
    }
]);

router.post('/signInWithPassword', [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Не указан пароль').exists(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    async (req, res) => {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400
                        // errors: validationErrors.array()
                    }
                });
            }

            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                        code: 400
                    }
                });
            }

            const isPaswordsEqual = await bcrypt.compare(password, existingUser.password);
            if (!isPaswordsEqual) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                });
            }

            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            res.status(200).send({
                ...tokens,
                userId: existingUser._id
            });
        } catch (error) {
            res.status(500).json({
                message: '500 Server Error. Try again later'
            });
        }
    }
]);

const isTokenInvalid = (validationToken, dbToken) => {
    return !validationToken || !dbToken || validationToken._id !== dbToken?.user?.toString();
};

router.post('/token', [
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    async (req, res) => {
        try {
            const { refreshToken } = req.body;
            const validationToken = tokenService.validateRefresh(refreshToken);
            const dbToken = await tokenService.findToken(refreshToken);

            if (isTokenInvalid(validationToken, dbToken)) {
                res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            const tokens = await tokenService.generate({
                _id: dbToken._id
            });

            await tokenService.save(dbToken._id, tokens.refreshToken);

            res.status(200).send({ ...tokens, userId: validationToken._id });
        } catch (error) {
            res.status(500).json({
                message: '500 Server Error. Try again later'
            });
        }
    }
]);

module.exports = router;
