const express = require('express');
const router = express.Router();
// Model reference
const Tenant = require('../models/tenant');
const mongoose = require('mongoose');

//const imagesRoutes = require('./commonRoutes/image');

// multer
var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 1MBs
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG,JPEG and PNG images only!'))
            return next(error)
        }
        //Success 
        cb(undefined, true)
    }
})



// API's Creation
/* Post API - Add Tenant */
router.post('/addTenant/:ownerId', upload.single('profilePic'), function(req, res) {
    console.log(req.file);
    const data = new Tenant({
        _id: mongoose.Types.ObjectId(),
        roomNo: req.body.roomNo,
        name: req.body.name,
        address: req.body.address,
        uin: req.body.uin,
        profilePic: req.file.path,
        rentStartDate: req.body.rentStartDate,
        depositAmount: req.body.depositAmount,
        isActive: req.body.isActive,
        ownerId: req.params.ownerId
    })
    data.save().then((response) => {
        res.status(201).json(response);
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

  router.get('/images/:path',function(req,res) {
    //console.log(req);
    res.download('./upload/' + req.params.path)
  })

module.exports = router;