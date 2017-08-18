var mongoose = require("mongoose");
var paymentSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
    type: {type: String, enum:["DEFAULT", "SECONDARY"]},
    nameOnCard: String,
    cardNumber: String,
    expirationMonth: Number,
    expirationYear:Number
}, {collection: "payment"});
module.exports = paymentSchema;