var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    review_item: {type: mongoose.Schema.Types.ObjectId, ref:"ProductModel"},
    reviewed_by: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    rating: Number,
    review_title: String,
    review_content: String,
    review_date:Date,
    helpful:Number
}, {collection: "review"});
module.exports = reviewSchema;