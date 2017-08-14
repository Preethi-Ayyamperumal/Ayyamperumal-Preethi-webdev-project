var app = require("../../express");
var addressModel = require("../models/user/address.model.server");

// http handlers
app.get("/api/address/:addressId", findAddressById);
app.get("/api/address", getAddress);
app.get("/api/addressdefault", getDefaultAddress);

app.post("/api/address", addAddress);
app.put("/api/address/:addressId", updateAddress);
app.delete("/api/address/:addressId", deleteAddress);


function updateAddress(req, res) {
    var addressId = req.params.addressId;
    var address=req.body;

    addressModel
        .updateAddress(addressId,address)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function deleteAddress(req, res) {
    var addressId = req.params.addressId;
    addressModel
        .deleteAddress(addressId)
        .then(function (user) {
            res.json(user);
        })
}

function addAddress(req, res) {
    var user = req.user;
    var address=req.body;

    addressModel
        .addAddress(user._id,address)
        .then(function (user) {
            res.json(user);
        })
}



function getAddress(req, res) {
    var user = req.user;
    addressModel
        .getAddress(user._id)
            .then(function (addresses) {
                res.json(addresses);

            });

}

function getDefaultAddress(req, res) {
    var user = req.user;
    addressModel
        .getDefaultAddress(user._id)
        .then(function (addresses) {
            res.json(addresses);

        });

}

function findAddressById(req, res) {
    var addressId = req.params.addressId;
    addressModel
        .findAddressById(addressId)
        .then(function (address) {
            if(address === null)
                res.status(200).json({ error: 'message' });
            else
                res.json(address);
            return;
        }, function (err) {
            res.status(200).json({ error: 'message' });
        });
}