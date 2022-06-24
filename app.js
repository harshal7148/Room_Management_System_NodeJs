const express = require('express');
const app = express();
// const owner = require('./models/owner');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Harshal:C9I9FqPUb0vPsejN@cluster0.imc6gc6.mongodb.net/RoomSystem?retryWrites=true&w=majority');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const crypto = require('crypto');
const owner = require("./models/owner");
var key = 'password';
var algo = 'aes256';

//
const jwt = require('jsonwebtoken');
jwtKey = "jwt";
//

owner.find({}, function(err, owner) {
    if (err) {
        console.warn(err);
    }
    // console.warn("owners", owner);
})


app.get('/owners', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    owner.find().then(result => {
        res.json(result);
    })
});

app.post('/login', jsonParser, (req, res) => {
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

app.listen(4000);