var mongoose = require("mongoose");
var cartSchema = require("./cart.schema.server");
var cartModel = mongoose.model("cartModel", cartSchema);

var productModel = require("../product/product.model.server");

cartModel.addtoCart = addtoCart;

module.exports = cartModel;




function addtoCart(productID) {
    return productModel.insertProduct(productID)
        .then(function (doc) {
            return cartModel.findOneAndUpdate({itemID:productID},
                { $set: { "itemID" : productID}, $inc : { "quantity" : 1 } },
                {upsert:true, returnNewDocument : false })
                .then(function (status) {
                    return productModel.updateProduct(productID);
                });
        })
}





