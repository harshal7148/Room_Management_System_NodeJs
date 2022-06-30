const express = require('express');
const router = express.Router();
const Outstanding = require('../models/outstanding');
const tenant = require('../models/tenant');
const outstandingHistory = require("../models/outstandingHistory")

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

module.exports = router;