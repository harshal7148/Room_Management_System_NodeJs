const express = require('express');
const router = express.Router();
const Outstanding = require('../models/outstanding');
const tenant = require('../models/tenant');

router.get('', async(req, res) => {
    let details = [];
    Outstanding.find({}).then(async results => {
        for(const element of results){
            await tenant.findOne({ _id: element.tenantId }).then(data => {
                details.push({
                    name: data.name,
                    amount: element.amount
                })
            });
        }
        res.json(details);
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