const express = require('express');
const router = express.Router();
const Outstanding = require('../models/outstanding');
const tenant = require('../models/tenant');

router.get('', async(req, res) => {
    let outstandingModel = [];
    Outstanding.find({}).then(async results => {
        for(const element of results){
            await tenant.findOne({ _id: element.tenantId }).then(data => {
                outstandingModel.push({
                    name: data.name,
                    amount: element.amount,
                    details: [
                        {
                            fromDate: "28/05/2022",
                            toDate: "28/05/2022",
                            outstandingAmount: 5000
                        },
                        {
                            fromDate: "29/05/2022",
                            toDate: "29/05/2022",
                            outstandingAmount: 5000
                        }
                    ]
                })
            });
        }
        res.json(outstandingModel);
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