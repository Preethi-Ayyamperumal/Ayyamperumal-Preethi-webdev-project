var mongoose = require("mongoose");
var wishlistSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
     // items : [{type: mongoose.Schema.Types.ObjectId, ref:"productModel"}]
    itemID : Number
}, {collection: "wishlist"},
    { toJSON:
{ virtuals: true },
    toObject:
    { virtuals: true }}
);
module.exports = wishlistSchema;


wishlistSchema.virtual('wishlistdata', {
    ref: 'productModel',
    localField: 'itemID',
    foreignField: 'itemId',
    justOne: true
});