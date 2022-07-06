const express = require('express');
const router = express.Router();
const Outstanding = require('../models/outstanding');
const tenant = require('../models/tenant');
const outstandingHistory = require("../models/outstandingHistory")
const mongoose = require('mongoose');



router.get('', (req, res) => {
    calcNextMonthDate();
    Outstanding.find()
        .populate("tenantId")
        .then(data => res.status(200).json(data))
        .catch(error => console.log(error));
});

router.get('/history/:ownerId', (req, res) => {
    outstandingHistory.find({ ownerId: req.params.ownerId })
        // .populate(req.params.ownerId.toString())
        .populate({ path: 'tenantId', select: ['name', 'profilePic', 'rentStartDate'] })
        .then(data => {
            console.log(data)
            data.forEach(item => {
                const obj = calcNextMonthDate(item.tenantId.rentStartDate);
                if (obj.isValid) {
                    item.histories[0].paidAmount = "5000";
                    item.histories[0].fromDate = item.tenantId.rentStartDate;
                    item.histories[0].toDate = obj.nextDate;
                } else {
                    item.histories[0].paidAmount = "0";
                }
            });
            // const value = calcNextMonthDate(data.tenantId.rentStartDate);
            res.status(200).json(data)
        })
        .catch(error => console.log(error));
});

function calcNextMonthDate(date) {
    // current date
    const currDate = new Date();
    const currDateMili = currDate.setHours(0, 0, 0, 0);
    // calculate oustanding date
    var outstandingDate = new Date(+ date);
    outstandingDate.setDate(outstandingDate.getDate() + 30);
    var nextDate = outstandingDate.getTime();
    // calculate days of diff between current date and next month date
    const dayInMilli = (currDateMili - nextDate);
    const diffDays = Math.floor(dayInMilli / (1000 * 3600 * 24));
    // Return true -> If diffDays is 0 & greater than 0 , else false ('-')
    const isDue = diffDays >= 0 ? true : false;
    return { isValid: isDue, nextDate: nextDate };
}

router.post('/calculateOutstanding/:ownerId', (req, res) => {
    tenant.find({}).then(tenant => {
        tenant.forEach(response => {
            outstandingHistory.findOne({ tenantId: response._id }).
                then(oustandingRes => {
                    if (oustandingRes === null) {
                        const result = calcNextMonthDate(response.rentStartDate)
                        if (result.isValid) {
                            const data = new outstandingHistory({
                                _id: mongoose.Types.ObjectId(),
                                ownerId: req.params.ownerId,
                                tenantId: response._id,
                                histories: [
                                    {
                                        fromDate: response.rentStartDate,
                                        toDate: result.nextDate,
                                        isPaid: false,
                                        paidAmount: '5000',
                                    }
                                ]
                            })
                            data.save().then(() => {
                            })
                                .catch((error) => {
                                    return res.status(500).send({ message: error.message });
                                })
                        }
                    }
                    else {
                        outstandingHistory.find({ tenantId: response._id }).then((response) => {
                            const result = calcNextMonthDate(response[0].histories[response[0].histories.length - 1].toDate)
                            if (result.isValid) {
                                response[0].histories.push({
                                    fromDate: response[0].histories[response[0].histories.length - 1].toDate,
                                    toDate: result.nextDate,
                                    isPaid: false,
                                    paidAmount: "5000"
                                })
                                outstandingHistory.updateOne({ _id: oustandingRes._id }, {
                                    $set: {
                                        histories: response[0].histories
                                    }
                                }).then(
                                )
                            }
                        })
                    }
                })
        })
        res.end("Inserted Sucesfully");
    })

})

module.exports = router;