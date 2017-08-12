var mongoose = require("mongoose");
var productSchema = require("./product.schema.server");
var productModel = mongoose.model("productModel", productSchema);
//var websiteModel = require("../website/website.model.server");
productModel.updateProduct = updateProduct;
productModel.insertProduct=insertProduct;
productModel.insertProducts=insertProducts;

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

function insertProducts(products) {
    var asynccalls=[];
    var items=products[0].lineitems;
    for (var i in items ){
        if(items[i].itemID)
        {
            console.log(items[i].itemID);
        }
    }
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


