var mongoose = require("mongoose");
var addressSchema = require("./address.schema.server");
var addressModel = mongoose.model("addressModel", addressSchema);
addressModel.getAddress = getAddress;
addressModel.findAddressById = findAddressById;
addressModel.addAddress = addAddress;
addressModel.updateAddress = updateAddress;
addressModel.deleteAddress = deleteAddress;
addressModel.getDefaultAddress=getDefaultAddress;
addressModel.setDefaultAddress=setDefaultAddress;

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

function setDefaultAddress(userID,addressID) {
    return addressModel.findOneAndUpdate({_user: userID,type:'DEFAULT'},
        {$set :{type:'SECONDARY'}}).then(function (status) {
        return addressModel.findByIdAndUpdate({_id: addressID},
            {$set :{type:'DEFAULT'}});
    })
}

function deleteAddress(addressID) {
    return addressModel.findByIdAndRemove(addressID);
}

function addAddress(userID,address) {
    address._user=userID;
    return addressModel.find({_user: userID},function (err, results) {
        if (err) {
            address.type = 'DEFAULT';
        }
        if (!results.length) {
            address.type = 'DEFAULT';
        }
        else
            address.type = 'SECONDARY';

        return addressModel.create(address);
    })

}

function findAddressById(addressID) {
    return addressModel.findById(addressID);
}
