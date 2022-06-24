const mongoose = require('mongoose');
let ownerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String
})

module.exports = mongoose.model('owners', ownerSchema);
