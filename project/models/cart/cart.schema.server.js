var mongoose = require("mongoose");
var cartSchema = mongoose.Schema({
    item : {type: mongoose.Schema.Types.ObjectId, ref:"ProductModel"},
    quantity: Number,
}, {collection: "cart"});
module.exports = cartSchema;