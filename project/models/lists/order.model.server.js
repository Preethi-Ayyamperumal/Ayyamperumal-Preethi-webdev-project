var mongoose = require("mongoose");
var orderSchema = require("./order.schema.server");
var orderModel = mongoose.model("orderModel", orderSchema);

orderModel.placeOrder = placeOrder;
orderModel.getOrders = getOrders;
orderModel.getAllOrders=getAllOrders;
orderModel.getOrderByID=getOrderByID;
orderModel.deleteOrderByID=deleteOrderByID;
orderModel.updateOrderStatus=updateOrderStatus;
module.exports = orderModel;

function placeOrder(userId,order) {
    order._user=userId;
    order.status='ORDER_PLACED';
    return orderModel.create(order);
}

function updateOrderStatus(orderID,order){
    return orderModel.findByIdAndUpdate(orderID,{$set:{status:order.status}});
}

function getOrders(userId) {
    return orderModel.find({_user:userId});
}

function getAllOrders() {
    return orderModel.find().populate('_user').populate('shipping_address').populate('payment_details')
        .exec(function (err, orders) {
            if (err) {
                console.log(err);
            }
            else
                console.log(orders);

        })
}



function getOrderByID(orderID) {
    return orderModel.findById(orderID);
}


function deleteOrderByID(orderID) {
    return orderModel.findByIdAndRemove(orderID);
}

