var mongoose = require("mongoose");
var productSchema = require("./product.schema.server");
var productModel = mongoose.model("productModel", productSchema);
//var websiteModel = require("../website/website.model.server");
productModel.updateProduct = updateProduct;
productModel.insertProduct=insertProduct;
productModel.getProducts=getProducts;
productModel.deleteProduct=deleteProduct;

module.exports = productModel;


function insertProduct(product) {
    return productModel.findOneAndUpdate({itemId: product.itemId},
        {$set: product},
        {upsert: true, returnNewDocument: true,    setDefaultsOnInsert: true}
    )
        .then(function (status) {
            {
                return status;
            }
        })
}

function getProducts() {
    return productModel.find();

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

function deleteProduct(productID) {
    return productModel.findByIdAndRemove(productID);
}


