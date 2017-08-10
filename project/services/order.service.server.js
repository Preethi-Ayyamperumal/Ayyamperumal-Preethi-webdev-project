const app = require('../../express');
var cartModel = require("../models/cart/cart.model.server");

app.get('/api/cart/add/:productID', addtoCart);



function addtoCart(req, res) {
    var productID = req.params.productID;
    cartModel.addtoCart(productID).then(function (status) {
        res.json(status);
    })
}

