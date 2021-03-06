var mongoose = require("mongoose");
var productSchema = mongoose.Schema({
    itemId: Number,
    name: String,
    thumbnailImage:String,
    salePrice: String,
    /*    msrp: String,
        salePrice: String,
        categoryPath: String,
        category: {type: String, ref:"CategoryModel"},
        shortDescription:String,
        longDescription:String,
        thumbnailImage:String,
        mediumImage:String,
        largeImage:String,
        standardShipRate:String,
        modelNumber:String,
        customerRating:String,
        categoryNode:String,*/
    quantity: {type:Number, default: 200},
Average_Rating:String,
    reviews:[{type: mongoose.Schema.Types.ObjectId, ref:"ReviewModel"}],
    dateCreated:{type: Date, default: Date.now}
}, {collection: "product"});
module.exports = productSchema;