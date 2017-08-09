var mongoose = require("mongoose");
var messageSchema = mongoose.Schema({
    From : {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    To: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    category: {type: String, ref:"SupportCategoryModel"},
    subject: String,
    message_date:Date,
    message_desc:String
}, {collection: "message"});
module.exports = messageSchema;