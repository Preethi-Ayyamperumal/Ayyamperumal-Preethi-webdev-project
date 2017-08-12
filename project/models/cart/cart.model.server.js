var mongoose = require("mongoose");
var cartSchema = require("./cart.schema.server");
var cartModel = mongoose.model("cartModel", cartSchema);

var productModel = require("../product/product.model.server");

cartModel.updateCart = updateCart;
cartModel.getCart = getCart;
cartModel.getCarttest=getCarttest;
cartModel.createCartforUser=createCartforUser;
module.exports = cartModel;




function updateCart(userId,product) {

    return cartModel.findOneAndUpdate({_user: userId , itemID:product.ID},
        {
            $set: {"itemID": product.ID} ,
            $inc: {'quantity':product.qty}
        },
        {upsert: true, returnNewDocument: true,  setDefaultsOnInsert: true})
        .then(function (status) {
            {
                return status;
            }
        })
}


function getCart(userId) {
    return cartModel.find({_user:userId});
}

function getCarttest(userId) {
    return cartModel.find({_user:userId}).populate('cartdata')
        .exec(function (err,cartitems) {

            var finalobj={};
            for(var _obj in cartitems)
            {
                for(var key in cartitems[_obj]._doc) {
                    finalobj[key] = cartitems[_obj]._doc[key];
                }
                for(var key in cartitems[_obj].cartdata) {
                    finalobj[key] = cartitems[_obj].cartdata[key];
                }
            }
                return finalobj;
                return finalobj;
    })
}

function createCartforUser(userId) {
    var cart ={
        _user:userId,
        lineitems:[]
    };
    return cartModel.create(cart);
}




