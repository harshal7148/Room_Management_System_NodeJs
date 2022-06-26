const express = require('express');
const router = express.Router();
const crypto = require('crypto');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const owner = require("../models/owner");
var key = 'password';
var algo = 'aes256';

//
const jwt = require('jsonwebtoken');
jwtKey = "jwt";
//

router.post('', jsonParser, (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    owner.findOne({ name: req.body.name }).then((data) => {
        var decipher = crypto.createDecipher(algo, key);
        var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
        console.warn('sadsad', decrypted);
        if (decrypted == req.body.password) {
            jwt.sign({ data }, jwtKey, { expiresIn: '300s' }, (err, token) => {
                res.status(201).json({ token });
            })
        } else {
            res.status(401).json("Password not match")
        }
    }).catch(error => res.json(error))
});

module.exports = router;