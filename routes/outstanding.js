const express = require('express');
const router = express.Router();
const Outstanding = require('../models/outstanding');
const tenant = require('../models/tenant');
router.get('', (req, res) => {
    let details = [];
    Outstanding.find({}).then(results => {
        results.forEach(element => {
            tenant.findOne({ _id: element.tenantId }).then(data => {
                details.push({
                    name: data.name,
                    amount: element.amount
                })
            });
        });
        setTimeout(() => {
            res.json(details);
        }, 100);
    })
});

module.exports = router;

// [
//     {
//     roomNo: 'sd',
//     amount: '34',
//     name: 'xzxz',
//     profilePic: 'sdsad',
//     details: [ 
//         {
//             fromDate: date,
//     toDate: date,
//     amount: '223
//     }
//         ]
//     }
//     ]