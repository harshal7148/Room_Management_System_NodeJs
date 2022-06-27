const mongoose = require('mongoose');
let tenantSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:String,
    address:String,
    uin:String,
    profilePic:String,
    rentStartDate:String,
   // depositAmount:Number,
    isActive:Boolean, 
    
})

module.exports = mongoose.model("tenants",tenantSchema);