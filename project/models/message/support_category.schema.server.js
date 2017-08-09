var mongoose = require("mongoose");
var supportCategorySchema = mongoose.Schema({
    category: {type: String,enum:["ORDERS", "PAYMENT", "ACCOUNT","PRODUCTS"]},
    manager: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}
}, {collection: "supportCategory"});
module.exports = supportCategorySchema;