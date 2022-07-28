const express = require('express');
//multer
var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})

module.exports.uploadImage = () =>{
    return multer({
        storage: storage,
        limits: {
            //Setting Image Size Limit to 1MBs
            fileSize: 1000000,
        },
        fileFilter(req, file, cb, next) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                //Error 
                const error = cb(new Error('Please upload JPG,JPEG and PNG images only!'))
                return next(error);
            }
            //Success 
            cb(undefined, true)
        }
    })    
}