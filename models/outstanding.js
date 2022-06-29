const mongoose = require('mongoose');
let outstandingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    amount: String,
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "tenants" }
});

module.exports = mongoose.model('outstandingdetails', outstandingSchema);