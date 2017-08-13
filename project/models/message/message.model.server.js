var mongoose = require("mongoose");
var messageSchema = require("./message.schema.server");
var messageModel = mongoose.model("messageModel", messageSchema);
messageModel.getMessage = getMessage;
messageModel.findMessageById = findMessageById;
messageModel.addMessage = addMessage;
messageModel.updateMessage = updateMessage;
messageModel.deleteMessage = deleteMessage;

module.exports = messageModel;

function getMessage(userID) {
    return messageModel.find({_user: userID});
}

function updateMessage(messageID,message) {
    return messageModel.update({_id: messageID},
        {$set: message});
}

function deleteMessage(messageID) {
    return messageModel.findByIdAndRemove(messageID);
}

function addMessage(userID,message) {
    message._user=userID;
    return messageModel.create(message);
}

function findMessageById(messageID) {
    return messageModel.findById(messageID);
}
