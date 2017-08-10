var mongoose = require("mongoose");
var productSchema = require("./product.schema.server");
var productModel = mongoose.model("productModel", productSchema);
//var websiteModel = require("../website/website.model.server");
productModel.updateProduct = updateProduct;
productModel.insertProduct=insertProduct;
module.exports = productModel;


function insertProduct(productID) {
    return productModel.findOneAndUpdate({itemId: productID},
        {$set: {"itemId": productID}},
        {upsert: true, returnNewDocument: true,    setDefaultsOnInsert: true}
    )
        .then(function (status) {
            {
                return status;
            }
        })
}

function updateProduct(productID) {
    return productModel.findOneAndUpdate({itemId: productID},
        {$set: {"itemId": productID}, $inc: {"quantity": -1}}
    )
        .then(function (status) {
            {
                return status;
            }
        })
}


