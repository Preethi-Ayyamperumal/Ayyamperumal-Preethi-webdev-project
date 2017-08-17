var mongoose = require("mongoose");
var addressSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    type: {type: String, enum:["DEFAULT", "SECONDARY"]},
    country: String,
    fullName: String,
    streetAddress1: String,
    streetAddress2: String,
    city:String,
    state:String,
    zipCode:String,
    phone:Number
}, {collection: "address"});
module.exports = addressSchema;