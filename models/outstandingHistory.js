const mongoose = require('mongoose');
let outstandingHistorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    histories: [{
        fromDate: String,
        toDate: String,
        isPaid: Boolean,
        paidAmount: String,
    }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "owners" },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "tenants" }
})

module.exports = mongoose.model("outstandinghistories", outstandingHistorySchema);