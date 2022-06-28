const express = require('express');
const app = express();
const Tenant = require('../models/tenant');
// Parser
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
// Connection String
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Harshal:C9I9FqPUb0vPsejN@cluster0.imc6gc6.mongodb.net/RoomSystem?retryWrites=true&w=majority').then(()=>{
    console.warn("db connected");
})

// API's Creation
/* Post API */
app.post('/tenants', jsonParser, function (req, res) {
    //res.set('Access-Control-Allow-Origin', '*');
    const data = new Tenant({
        _id: "1565665665",
        name: req.body.name,
        address: req.body.address,
        uin: req.body.uin,
        profilePic: req.body.profilePic,
        rentStartDate: req.body.rentStartDate,
      //  depositAmount: req.body.depositAmount,
        isActive: req.body.isActive,
    })
    data.save().then(() => {
        res.status(500).send('testing');
    }).catch((error) => {
        //res.status(400).json(error)
    })
    
})

app.listen(3000);


