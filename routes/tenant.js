const express = require('express');
const router = express.Router();
// Parser
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
// Model reference
const Tenant = require('../models/tenant');
const mongoose = require('mongoose');

// API's Creation
/* Post API */
router.post('', jsonParser, function (req, res) {
    const data = new Tenant({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        uin: req.body.uin,
        profilePic: req.body.profilePic,
        rentStartDate: req.body.rentStartDate,
      //  depositAmount: req.body.depositAmount,
        isActive: req.body.isActive,
    })
    data.save().then(() => {
        res.status(201).json(data);
    }).catch((error) => {
        return res.status(500).send({ message: error.message });
    })
    
})

module.exports = router;



