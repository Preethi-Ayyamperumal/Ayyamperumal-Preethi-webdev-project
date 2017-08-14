var mongoose = require("mongoose");
var orderSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    line_items : [{
        item_name: String,
        quantity: Number
    }],
    shipping_address:{type: mongoose.Schema.Types.ObjectId, ref:"AddressModel"},
    payment_details:{type: mongoose.Schema.Types.ObjectId, ref:"PaymentModel"},
    subtotal:Number,
    total_shipping:Number,
    grand_total:Number,
    delivered_Date:Date,
    ordered_Date:{type:Date,default:Date.now}
}, {collection: "order"});
module.exports = orderSchema;