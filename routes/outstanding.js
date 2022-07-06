const express = require('express');
const router = express.Router();
const Outstanding = require('../models/outstanding');
const tenant = require('../models/tenant');
const outstandingHistory = require("../models/outstandingHistory")
const mongoose = require('mongoose');
const stringUtil = require('../commonFunction/stringUtil');
const dateUtil = require('../commonFunction/dateUtil');


router.get('', (req, res) => {
    calcNextMonthDate();
    Outstanding.find()
        .populate("tenantId")
        .then(data => res.status(200).json(data))
        .catch(error => console.log(error));
});

router.get('/getOutstandingHistory/:ownerId', (req, res) => {
    outstandingHistory.find({}).
    populate('tenantId', select = ['name','profilePic'])
    .then(outsandingHistories => {
        res.status(201).json(outsandingHistories);
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
});

router.post('/calculateOutstanding/:ownerId', (req, res) => {
    tenant.find({}).then(tenant => {
        tenant.forEach(response => {
            outstandingHistory.findOne({ tenantId: response._id }).
                then(oustandingRes => {
                    if (stringUtil.isNullorEmpty(oustandingRes)) {
                        const result = dateUtil.calcNextMonthDate(response.rentStartDate,30)
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