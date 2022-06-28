const mongoose = require('mongoose');
let outstandingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    amount: String,
    tenantId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('outstandingdetails', outstandingSchema);