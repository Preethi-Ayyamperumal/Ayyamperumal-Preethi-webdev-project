var mongoose = require("mongoose");
var paymentSchema = require("./payment.schema.server");
var paymentModel = mongoose.model("paymentModel", paymentSchema);
paymentModel.getPayment = getPayment;
paymentModel.findPaymentById = findPaymentById;
paymentModel.addPayment = addPayment;
paymentModel.updatePayment = updatePayment;
paymentModel.deletePayment = deletePayment;
paymentModel.getDefaultPayment=getDefaultPayment;
paymentModel.setDefaultPayment=setDefaultPayment;
module.exports = paymentModel;

function getPayment(userID) {
    return paymentModel.find({_user: userID});
}

function getDefaultPayment(userID) {
    return paymentModel.findOne({_user: userID,type:'DEFAULT'});
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
    return paymentModel.find({_user: userID},function (err, results) {
        if (err) {
            payment.type = 'DEFAULT';
        }
        if (!results.length) {
            payment.type = 'DEFAULT';
        }
        else
            payment.type = 'SECONDARY';

        return paymentModel.create(payment);
    })
}

function findPaymentById(payment) {
    return paymentModel.findById(payment);
}


function setDefaultPayment(userID,paymentID) {
    return paymentModel.findOneAndUpdate({_user: userID,type:'DEFAULT'},
        {$set :{type:'SECONDARY'}}).then(function (status) {
        return paymentModel.findByIdAndUpdate({_id: paymentID},
            {$set :{type:'DEFAULT'}});
    })
}