var app = require("../../express");
var messageModel = require("../models/message/message.model.server");

// http handlers
app.get("/api/message/:messageId", findMessageById);
app.get("/api/sentmessage", getSentMessages);
app.get("/api/receivedmessage", getReceivedMessages);
app.post("/api/messagetomanagers", sendMessageToManagers);
app.post("/api/message", addMessage);
app.put("/api/message/:messageId", updateMessage);
app.delete("/api/message/:messageId", deleteMessage);


function updateMessage(req, res) {
    var messageId = req.params.messageId;
    var user = req.user;
    var message=req.body;

    messageModel
        .updateMessage(user._id, messageId,message)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function addMessage(req, res) {
    var user = req.user;
    var message=req.body;
    messageModel
        .addMessage(user._id,message)
        .then(function (user) {
            res.json(user);
        })
}

function sendMessageToManagers(req, res) {
    var user = req.user;
    var message=req.body;
    messageModel
        .sendMessageToManagers(user._id,message)
        .then(function (user) {
            res.json(user);
        })
}

function getSentMessages(req, res) {
    var user = req.user;
    messageModel
        .getSentMessages(user._id)
        .then(function (review) {
            res.json(review);

        });
}

function getReceivedMessages(req, res) {
    var user = req.user;
    messageModel
        .getReceivedMessages(user._id)
        .then(function (review) {
            res.json(review);

        });

}

function deleteMessage(req, res) {
    var messageId = req.params.messageId;
    messageModel
        .deleteMessage(messageId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}



function findMessageById(req, res) {
    var messageId = req.params.messageId;
    messageModel
        .getMessageById(messageId)
        .then(function (message) {
            if(message === null)
                res.status(200).json({ error: 'message' });
            else
                res.json(message);
            return;
        }, function (err) {
            res.status(200).json({ error: 'message' });
        });
}