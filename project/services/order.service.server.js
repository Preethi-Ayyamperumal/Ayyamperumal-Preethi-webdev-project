const app = require('../../express');
var cartModel = require("../models/cart/cart.model.server");
var orderModel=require("../models/lists/order.model.server");
app.put('/api/cart/update/', updateCart);
app.post('/api/placeOrder/', placeOrder);

app.get('/api/cart/', getCart);
app.delete('/api/cart/', clearCart);
app.delete('/api/order/:oid',deleteOrderByID);
app.get('/api/orders/',getOrders);
app.get('/api/allOrders/',getAllOrders);
app.put('/api/order/:oid',updateOrderStatus);
app.get('/api/order/:oid',getOrderByID);

function placeOrder(req,res)
{
    var user = req.user;
    var order = req.body;
    orderModel.placeOrder(user._id,order)
        .then(function (status) {
            res.json(status);})
}
function getOrders(req,res)
{
    var user = req.user;
    orderModel.getOrders(user._id)
        .then(function (status) {
            res.json(status);})
}

function getAllOrders(req,res)
{
    orderModel.getAllOrders()
        .then(function (status) {
            res.json(status);})
}

function getOrderByID(req,res)
{
    var orderID=req.params.oid;
    orderModel.getOrderByID(orderID)
        .then(function (status) {
            res.json(status);})
}

function deleteOrderByID(req,res)
{
    var orderID=req.params.oid;
    orderModel.deleteOrderByID(orderID)
        .then(function (status) {
            res.json(status);})
}

function updateOrderStatus(req,res)
{
    var orderID=req.params.oid;
    var order=req.body;
    orderModel.updateOrderStatus(orderID,order)
        .then(function (status) {
            res.json(status);
        })
}


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

function clearCart(req,res){
    var user=req.user;
    cartModel.clearCart(user._id).then(function (status) {
        res.json(status);
    })
}


