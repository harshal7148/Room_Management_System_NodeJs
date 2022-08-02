const express = require('express');
const router = express.Router();
// Model reference
const mongoose = require('mongoose');
const Tenant = require('../models/tenant');
const imagesRoutes = require('./commonRoutes/image');

//multer
var multer = require("multer");
const { func } = require('@hapi/joi');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
})
var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
})

// API's Creation

/* Get API - Get Tenant */
router.get('/getTenant/:ownerId', (req, res) => {
    // calcNextMonthDate();
    Tenant.find()
        .then(data => res.status(200).json(data))
        .catch(error => console.log(error));
});

/* Post API - Add Tenant */
router.post('/addTenant/:ownerId', upload.single('file'), function(req, res) {
    //req.body = req.body.params;
    console.log("body",req.body);
    //console.log("body",req.body);

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
    data.save().then((response) => {
        return res.status(201).json({
            success : 1,
            message : "Tenant saved successfully"
        });

    }).catch((error) => {
        console.log("str",error)
        return res.status(500).send({ message: error.message });
    })
},
    // multer Error Handling
    (error, req, res, next) => {
        console.log("str1", error);
        next(res.status(400).send({
            message: error.message
        }))
    }
    );


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

    Tenant.updateOne({_id:req.params.tenantId},data).then((response) => {
        res.status(201).json(response);
    }).catch((error) => {
        return res.status(500).send({ message: error.message });
    })
})

/* Delete API - Delete Tenant */
router.delete('/deleteTenant/:tenantId/:ownerId' , function(req,res) {
    Tenant.deleteOne({_id:req.params.tenantId,ownerId: req.params.ownerId}).then((response) => {
        res.status(201).json(response);
    }).catch((error) => {
        return res.status(500).send({ message: error.message });
    })
})



module.exports = router;