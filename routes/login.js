const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const owner = require("../models/owner");
var key = 'password';
var algo = 'aes256';

//
const jwt = require('jsonwebtoken');
jwtKey = "jwt";
//

router.post('', async(req, res) => {
    try {
        const data = await owner.findOne({ name: req.body.name });
        console.log(data)
        if (!data) {
            return res.status(404).send({ message: "User Not found." });
        }
        var decipher = crypto.createDecipher(algo, key);
        var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
        console.warn('sadsad', req.body.name);
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