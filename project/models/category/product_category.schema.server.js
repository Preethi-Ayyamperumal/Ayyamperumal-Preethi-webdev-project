
var mongoose = require("mongoose");
var productCategorySchema = mongoose.Schema({
    id:String,
    name:String,
    path:String,
    children:[]
}, {collection: "productCategory"});
module.exports = productCategorySchema;