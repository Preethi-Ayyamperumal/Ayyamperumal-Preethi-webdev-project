var mongoose = require("mongoose");
var addressSchema = require("./address.schema.server");
var addressModel = mongoose.model("addressModel", addressSchema);
addressModel.getAddress = getAddress;
addressModel.findAddressById = findAddressById;
addressModel.addAddress = addAddress;
addressModel.updateAddress = updateAddress;
addressModel.deleteAddress = deleteAddress;

module.exports = addressModel;

function getAddress(userID) {
    return addressModel.find({_user: userID});
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
    return addressModel.create(address);
}

function findAddressById(userId) {
    return addressModel.findById(userId);
}
