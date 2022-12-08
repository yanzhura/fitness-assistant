const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('../models/Token');

const ACCESS_SECRET = config.get('accessSecret');
const REFRESH_SECRET = config.get('refreshSecret');

class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET);
        return {
            accessToken,
            refreshToken,
            expiresIn: 3600
        };
    }

    async save(userId, refreshToken) {
        const data = await Token.findOne({ user: userId });
        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }

        const token = await Token.create({ user: userId, refreshToken: refreshToken });
        return token;
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, REFRESH_SECRET);
        } catch (error) {
            return null;
        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, ACCESS_SECRET);
        } catch (error) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (error) {
            return null;
        }
    }
}

module.exports = new TokenService();
