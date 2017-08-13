const app = require('../../express');
var wishListModel = require("../models/lists/wishlist.model.server");

app.get('/api/wishlist/:pID', addItem);
app.get('/api/wishlist/', getItems);
app.delete('/api/wishlist/:wID', removeItem);



function addItem(req, res) {
    var user = req.user;
    var productID = req.params.pID;

    wishListModel.addItem(user._id,productID).then(function (status) {
        res.json(status);
    })
}

function removeItem(req, res) {
    var wID = req.params.wID;
    wishListModel.removeItem(wID).then(function (status) {
        res.json(status);
    })
}

function getItems(req,res) {
    var user=req.user;
    wishListModel.getItems(user._id).then(function(items){
        var finalobj={};
        var returndata=[];
        for(var _obj in items)
        {
            finalobj={};
            for(var key in items[_obj].wishlistdata._doc) {
                finalobj[key] = items[_obj].wishlistdata._doc[key];
            }
            for(var key in items[_obj]._doc) {
                finalobj[key] = items[_obj]._doc[key];
            }

            returndata.push(finalobj)
        }
        res.json(returndata);
    });

}


