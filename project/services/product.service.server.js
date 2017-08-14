const app = require('../../express');
var productModel = require("../models/product/product.model.server");

app.put('/api/product/insert', insertProduct);
app.get('/api/product/', getProducts);
app.delete('/api/product/:productID', deleteProduct);



function insertProduct(req, res) {
    var product=req.body;
     productModel.insertProduct(product)
         .then(function (response) {
                res.json(response);
     })
}


function getProducts(req, res) {
    productModel.getProducts()
        .then(function (response) {
            res.json(response);
        })
}
function deleteProduct(req, res) {
    var productID =req.params.productID;
    productModel.deleteProduct(productID)
        .then(function (response) {
            res.json(response);
        })
}

