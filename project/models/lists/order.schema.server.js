var mongoose = require("mongoose");
var orderSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
    line_items : [{
        item_name: String,
        quantity: Number
    }],
    shipping_address:{type: mongoose.Schema.Types.ObjectId, ref:"addressModel"},
    payment_details:{type: mongoose.Schema.Types.ObjectId, ref:"paymentModel"},
    subtotal:Number,
    total_shipping:Number,
    grand_total:Number,
    delivered_Date:Date,
    status: {type: String, default:'ORDER_PLACED' ,enum:["ORDER_PLACED", "DELIVERED", "SHIPPED","CANCELLED"]},
    ordered_Date:{type:Date,default:Date.now}
}, {collection: "order"});
module.exports = orderSchema;