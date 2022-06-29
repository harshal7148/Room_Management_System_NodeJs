const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const owner = require("../models/owner");

//
const jwt = require('jsonwebtoken');
jwtKey = "jwt";
//

router.post('', async(req, res) => {
    try {
        const data = await owner.findOne({ name: req.body.name });
        if (!data) {
            return res.status(404).send({ message: "User Not found." });
        }
        var decipher = crypto.createDecipher(process.env.ALGO, process.env.KEY);
        var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
        if (decrypted === req.body.password && req.body.name === data.name) {
            jwt.sign({ data }, jwtKey, { expiresIn: '300s' }, (err, token) => {
                res.status(201).json({ token });
            })
        } else {
            res.status(401).json("Password not match")
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

module.exports = router;