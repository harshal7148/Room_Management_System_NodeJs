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
    // date = 1653849001000;
    const nextDate = date + 30 * 86400000;
    const currDate = new Date();
    const currDateMili = currDate.setHours(0, 0, 0, 0);

    const day = (currDateMili - nextDate);

    const days = Math.floor(day / (24 * 60 * 60 * 1000));
    console.log(days)
    const isInc = days === 0 ? true : false;
    return { isValid: isInc, nextDate: nextDate };
}

router.post('/calculateOutstanding', (req, res) => {
    outstandingHistory.findOne({ tenantId: '62b9985817687f39b4d484f7' }).
        then(oustandingRes => {
            if (oustandingRes === null) {
                tenant.findOne({ _id: '62b9985817687f39b4d484f7' }).then(
                    response => {
                        const result = calcNextMonthDate(response.rentStartDate)
                        if (result.isValid) {
                            const data = new outstandingHistory({
                                _id: mongoose.Types.ObjectId(),
                                ownerId: '62b15c7f15327f43f5a14621',
                                tenantId: '62b9985817687f39b4d484f7',
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
                                console.log("data",data);
                                res.status(201).json(data);
                            }).catch((error) => {
                                return res.status(500).send({ message: error.message });
                            })
                        }
                    }
                )
            }
            else{
                console.log("else")
                outstandingHistory.find({tenantId : '62b9985817687f39b4d484f7'}).then((res)=>{
                    res['histories'].forEach(obj=>{
                        console.log(obj)
                    });

                    const result =  calcNextMonthDate(res.histories[res.histories.length - 1].toDate)
                    if(result.isValid){
                        const history =  res.histories.push({
                            fromDate: res.toDate,
                            toDate: result.nextDate,
                            isPaid: false,
                            paidAmount: "5000"
                        })
                        outstandingHistory.updateOne({_id: '62c2aaddd800225f65e890bd'}, {$set :{histories:history}})
                    }
                })
            }
        })
})

module.exports = router;