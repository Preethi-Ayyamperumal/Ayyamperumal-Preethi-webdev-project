var mongoose = require("mongoose");
var cartSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
    itemID : Number,
    quantity: {type:Number,default:1},
    subtotal:{type:Number,default:0}
},
    {  collection: "cart"},
    { toJSON:
        { virtuals: true },
    toObject:
        { virtuals: true }}
        );
module.exports = cartSchema;


cartSchema.virtual('cartdata', {
    ref: 'productModel',
    localField: 'itemID',
    foreignField: 'itemId',
    justOne: true
});