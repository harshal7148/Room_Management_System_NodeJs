const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const owner = require("../models/owner");
const errorMessages = require("../errorMessages/messages");

//
const jwt = require('jsonwebtoken');
jwtKey = "jwt";
//

router.post('', async (req, res, next) => {
    try {
        const data = await owner.findOne({ name: req.body.name });
        if (!data) {
            throw new Error("userNotFound");
        }
        var decipher = crypto.createDecipher(process.env.ALGO, process.env.KEY);
        var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
        if (decrypted === req.body.password && req.body.name === data.name) {
            jwt.sign({ data }, jwtKey, { expiresIn: '300s' }, (err, token) => {
                res.status(201).json({ token });
            })
        } else {
            throw new Error("passNotMatched");
        }
    } catch (error) {
        next({ status: errorMessages[error.message]?.status, message: errorMessages[error.message]?.message });
    }
});

module.exports = router;