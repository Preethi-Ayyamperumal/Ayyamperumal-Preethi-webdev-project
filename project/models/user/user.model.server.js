var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("userModel", userSchema);

userModel.createUser = createUser;
userModel.updateUser = updateUser;

userModel.findUserById=findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByFacebookId = findUserByFacebookId,

module.exports = userModel;


function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function createUser(user) {

    return userModel.create(user);
}


function updateUser(user) {
    return userModel.findOneAndUpdate({username:user.username}, {$set: user});
}

function findUserById(userID) {
    return userModel.findById(userID);
}


function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

