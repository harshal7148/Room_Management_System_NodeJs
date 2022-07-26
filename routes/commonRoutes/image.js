// const express = require('express');
// const router = express.Router();


// // multer
// var multer = require("multer");
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '_' + file.originalname);
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         // Setting Image Size Limit to 1MBs
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             //Error 
//             cb(new Error('Please upload JPG,JPEG and PNG images only!'))
//             return next(error)
//         }
//         //Success 
//         cb(undefined, true)
//     }
// })



// // save Image
// // router.post('/saveImage', upload.single('file'), function (req, res) {
// //     res.json({
// //         message: "Image save sucessfully"
// //     });
// // },

// //     (error, req, res, next) => {
// //         console.log(error);
// //         res.status(400).send({
// //             message: error.message
// //         })
// //     });

// module.exports = router;