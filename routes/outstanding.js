const express = require('express');
const router = express.Router();
const Outstanding = require('../models/outstanding');
const tenant = require('../models/tenant');
router.get('', (req, res) => {
    Outstanding.find().then(result => {
        const details = tenant.find({ _id: result.tenantId }).then(data => {
            return {
                roomNo: data.roomNo,
                name: data.name,
                amount: result.amount
            }
        })
        res.json(details);
    })
});

module.exports = router;