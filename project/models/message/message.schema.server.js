var mongoose = require("mongoose");
var messageSchema = mongoose.Schema({
    From : {type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
    To: {type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
    category: {type: String,enum:["ORDERS", "PAYMENT", "ACCOUNT","PRODUCTS"]},
    subject: String,
    message_date:{type:Date,default:Date.now},
    message_desc:String
}, {collection: "message"});
module.exports = messageSchema;