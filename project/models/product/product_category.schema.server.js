var mongoose = require("mongoose");
var productCategorySchema = mongoose.Schema({
    id:String,
    name:String,
    path:String,
    children:[{type: mongoose.Schema.Types.ObjectId, ref:"ProductCategoryModel"}]
}, {collection: "productCategory"});
module.exports = productCategorySchema;