var mongoose = require("mongoose");
var wishlistSchema = mongoose.Schema({
    name:String,
    _user:{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    items : [{type: mongoose.Schema.Types.ObjectId, ref:"ProductModel"}],
    privacy: {type: String, enum:["PUBLIC", "PRIVATE"]},
}, {collection: "wishlist"});
module.exports = wishlistSchema;