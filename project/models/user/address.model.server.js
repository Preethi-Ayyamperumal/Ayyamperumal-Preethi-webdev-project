var mongoose = require("mongoose");
var addressSchema = require("./address.schema.server");
var addressModel = mongoose.model("addressModel", addressSchema);
addressModel.getAddress = getAddress;
addressModel.findAddressById = findAddressById;
addressModel.addAddress = addAddress;
addressModel.updateAddress = updateAddress;
addressModel.deleteAddress = deleteAddress;
addressModel.getDefaultAddress=getDefaultAddress;
module.exports = addressModel;

function getAddress(userID) {
    return addressModel.find({_user: userID});
}

function getDefaultAddress(userID) {
    return addressModel.findOne({_user: userID,type:'DEFAULT'});
}

function updateAddress(addressID,address) {
    return addressModel.update({_id: addressID},
        {$set: address});
}

function deleteAddress(addressID) {
    return addressModel.findByIdAndRemove(addressID);
}

function addAddress(userID,address) {
    address._user=userID;
    address.type='DEFAULT';
    return addressModel.create(address);
}

function findAddressById(userId) {
    return addressModel.findById(userId);
}
