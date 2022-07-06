const express = require('express');
const router = express.Router();
// Model reference
const Tenant = require('../models/tenant');
const mongoose = require('mongoose');

// API's Creation

/* Post API - Add Tenant */
router.post('/addTenant/:ownerId', function(req, res) {
    const data = new Tenant({
        _id: mongoose.Types.ObjectId(),
        roomNo: req.body.roomNo,
        name: req.body.name,
        address: req.body.address,
        uin: req.body.uin,
        profilePic: req.body.profilePic,
        rentStartDate: req.body.rentStartDate,
        depositAmount: req.body.depositAmount,
        isActive: req.body.isActive,
        ownerId: req.params.ownerId
    })
    data.save().then((res1) => {
        res.status(201).json(res1);
    }).catch((error) => {
        return res.status(500).send({ message: error.message });
    })
})

/* Put API - Update Tenant */
router.put('/updateTenant/:tenantId/:ownerId' , function(req,res) {
    const data = new Tenant({
        roomNo: req.body.roomNo,
        name: req.body.name,
        address: req.body.address,
        uin: req.body.uin,
        profilePic: req.body.profilePic,
        rentStartDate: req.body.rentStartDate,
        depositAmount: req.body.depositAmount,
        isActive: req.body.isActive,
        ownerId: req.params.ownerId
    })

    Tenant.updateOne({_id:req.params.tenantId},data).then((res1) => {
        res.status(201).json(res1);
    }).catch((error) => {
        return res.status(500).send({ message: error.message });
    })
})

/* Delete API - Delete Tenant */
router.delete('/deleteTenant/:tenantId/:ownerId' , function(req,res) {
    Tenant.deleteOne({_id:req.params.tenantId,ownerId: req.params.ownerId}).then((res1) => {
        res.status(201).json(res1);
    }).catch((error) => {
        return res.status(500).send({ message: error.message });
    })
})

module.exports = router;