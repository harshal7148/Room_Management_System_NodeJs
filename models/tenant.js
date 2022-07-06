const mongoose = require('mongoose');
let tenantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roomNo:String,
    name: String,
    address: String,
    uin: String,
    profilePic: String,
    rentStartDate: Number,
    depositAmount:String,
    isActive: Boolean,
    ownerId: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model("tenants", tenantSchema);