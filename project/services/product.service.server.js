const app = require('../../express');
var productModel = require("../models/product/product.model.server");

app.put('/api/product/insert', insertProduct);



function insertProduct(req, res) {
    var product=req.body;
     productModel.insertProduct(product)
         .then(function (response) {
                res.json(response);
     })
}

