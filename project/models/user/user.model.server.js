var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("userModel", userSchema);
var cartModel=require("../cart/cart.model.server");
userModel.createUser = createUser;
userModel.updateUser = updateUser;

userModel.findUserById=findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.unFollowUser=unFollowUser;
userModel.addFollowers=addFollowers;
userModel.getFollowers=getFollowers;
userModel.getFollowing=getFollowing;
userModel.getUsersByRole=getUsersByRole;
userModel.getUserstoFollow=getUserstoFollow;
userModel.deleteUser=deleteUser;
userModel.updateUserAuthorized=updateUserAuthorized;
module.exports = userModel;


function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function createUser(user) {
    return userModel.create(user)
        .then(function (user) {
                return user;
            });
}


function updateUser(user) {
    return userModel.findOneAndUpdate({username:user.username}, {$set: user});
}

function updateUserAuthorized(userID,user) {
    return userModel.findOneAndUpdate({username:user.username}, {$set: user});
}
function deleteUser(userID) {
    return userModel.findByIdAndRemove(userID);
}
function findUserById(userID) {
    return userModel.findById(userID);
}


function findAllUsers() {
    return userModel.find();
}

function getUsersByRole(role) {
    return userModel.find({role:role});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}


function unFollowUser(user,username){
    return userModel.findByIdAndUpdate(user._id,
        {$pull :{following: username}});

}

function addFollowers(user,users){
    return userModel.findByIdAndUpdate(user._id,
        {$push: { following : { $each: users}}});
}

function getFollowing(userId){
    return userModel.findById(userId).select('following -_id');
}


function getFollowers(username){
    return userModel.find({following : username}).select('username -_id');
}


function getUserstoFollow(user){
    var userstoremove = user.following;
    userstoremove.push(user.username);
    return userModel.find({username: {$nin : userstoremove},role:'CUSTOMER'}).select('username -_id')
}
