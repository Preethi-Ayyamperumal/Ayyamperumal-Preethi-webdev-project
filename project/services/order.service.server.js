const app = require('../../express');
var cartModel = require("../models/cart/cart.model.server");

app.put('/api/cart/update/', updateCart);
app.get('/api/cart/', getCart);



function updateCart(req, res) {
    var cartItem = req.body;
    var user = req.user;
    cartModel.updateCart(user._id,cartItem).then(function (status) {
        res.json(status);
    })
}

function getCart(req,res) {
    var user=req.user;
    cartModel.getCarttest(user._id).then(function(cartitems){
        var finalobj={};
        var returndata=[];
        for(var _obj in cartitems)
        {
            finalobj={};
            for(var key in cartitems[_obj].cartdata._doc) {
                finalobj[key] = cartitems[_obj].cartdata._doc[key];
            }
            for(var key in cartitems[_obj]._doc) {
                finalobj[key] = cartitems[_obj]._doc[key];
            }

            returndata.push(finalobj)
        }
        res.json(returndata);
    });

}


