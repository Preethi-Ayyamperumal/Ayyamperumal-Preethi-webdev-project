var app = require("../../express");
var paymentModel = require("../models/user/payment.model.server");

// http handlers
app.get("/api/payment/:paymentId", findPaymentById);
app.get("/api/payment", getPayment);
app.post("/api/payment", addPayment);
app.put("/api/payment/:paymentId", updatePayment);
app.delete("/api/payment/:paymentId", deletePayment);


function updatePayment(req, res) {
    var paymentId = req.params.paymentId;
    var payment=req.body;

    paymentModel
        .updatePayment(paymentId,payment)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function addPayment(req, res) {
    var user = req.user;
    var payment=req.body;
    paymentModel
        .addPayment(user._id,payment)
        .then(function (user) {
            res.json(user);
        })
}

function getPayment(req, res) {
    var user = req.user;
    paymentModel
        .getPayment(user._id)
        .then(function (payments) {
            res.json(payments);

        });

}

function deletePayment(req, res) {
    var paymentId = req.params.paymentId;


    paymentModel
        .deletePayment(paymentId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}



function findPaymentById(req, res) {
    var paymentId = req.params.paymentId;
    paymentModel
        .findPaymentById(paymentId)
        .then(function (payment) {
            if(payment === null)
                res.status(200).json({ error: 'message' });
            else
                res.json(payment);
            return;
        }, function (err) {
            res.status(200).json({ error: 'message' });
        });
}