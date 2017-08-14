var mongoose = require("mongoose");
var orderSchema = require("./order.schema.server");
var orderModel = mongoose.model("orderModel", orderSchema);

orderModel.placeOrder = placeOrder;
orderModel.getOrders = getOrders;
orderModel.getOrderByID=getOrderByID;
module.exports = orderModel;

function placeOrder(userId,order) {
    order._user=userId;
    return orderModel.create(order);
}


function getOrders(userId) {
    return orderModel.find({_user:userId});
}


function getOrderByID(orderID) {
    return orderModel.findById(orderID);
}


