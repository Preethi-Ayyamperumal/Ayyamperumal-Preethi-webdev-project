var mongoose = require("mongoose");
var messageSchema = require("./message.schema.server");

var userModel = require("../user/user.model.server");

var messageModel = mongoose.model("messageModel", messageSchema);
messageModel.getSentMessages = getSentMessages;
messageModel.getReceivedMessages = getReceivedMessages;
messageModel.getMessageById = getMessageById;
messageModel.addMessage = addMessage;
messageModel.updateMessage = updateMessage;
messageModel.deleteMessage = deleteMessage;
messageModel.sendMessageToManagers=sendMessageToManagers;
module.exports = messageModel;

function getSentMessages(userID) {
    return messageModel.find({From: userID}).populate('To')
        .exec(function (err, messages) {
        if (err) {
            console.log(err);
        }
        else
            console.log(messages);

    })
}

function getReceivedMessages(userID) {
    return messageModel.find({To: userID}).populate('From').exec();
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

function getMessageById(messageID) {
    return messageModel.findById(messageID).populate('To').populate('From').exec();
}

function sendMessageToManagers(userID,message) {
    message.From=userID;
    return userModel.getUsersByRole("MANAGER")
        .then(
            function(managers)
            {
                var messages = [];
                for(manager in managers)
                    {
                     message.To=managers[manager]._id;
                     messages.push(message);
                    }
                return messageModel.collection.insert(messages);
    });
}


