const mongoose = require('mongoose');
let ownerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    password: { type: String, require: true }
})

module.exports = mongoose.model('owners', ownerSchema);