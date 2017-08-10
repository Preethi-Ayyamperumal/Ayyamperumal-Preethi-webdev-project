var mongoose = require("mongoose");
var cartSchema = mongoose.Schema({
    itemID : Number,
    quantity: Number
}, {collection: "cart"});
module.exports = cartSchema;