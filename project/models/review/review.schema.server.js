var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
        itemID: String,
        reviewed_by: {type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
        reviewer_username:String,
        rating: Number,
        review_title: String,
        review_content: String,
        review_date:Date,
        helpful:Number
    },
    {collection: "review"},
    {toJSON:
        {
            virtuals: true
        }, toObject:
            { virtuals: true }}
);

module.exports = reviewSchema;
reviewSchema.virtual('reviewdata', {
    ref: 'productModel',
    localField: 'itemID',
    foreignField: 'itemId',
    justOne: true
});
