var mongoose = require("mongoose");
var paymentSchema = require("./payment.schema.server");
var paymentModel = mongoose.model("paymentModel", paymentSchema);
paymentModel.getPayment = getPayment;
paymentModel.findPaymentById = findPaymentById;
paymentModel.addPayment = addPayment;
paymentModel.updatePayment = updatePayment;
paymentModel.deletePayment = deletePayment;

module.exports = paymentModel;

function getPayment(userID) {
    return paymentModel.find({_user: userID});
}

function updatePayment(paymentID,payment) {
    return paymentModel.update({_id: paymentID},
        {$set: payment});
}

function deletePayment(paymentID) {
    return paymentModel.findByIdAndRemove(paymentID);
}

function addPayment(userID,payment) {
    payment._user=userID;
    return paymentModel.create(payment);
}

function findPaymentById(payment) {
    return paymentModel.findById(payment);
}
