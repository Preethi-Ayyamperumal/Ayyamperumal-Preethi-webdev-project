var mongoose = require("mongoose");
var wishlistSchema = require("./wishlist.schema.server");
var wishlistModel = mongoose.model("wishlistModel", wishlistSchema);


wishlistModel.addItem = addItem;
wishlistModel.removeItem = removeItem;
wishlistModel.getItems=getItems;
module.exports = wishlistModel;

function addItem(userId,productID) {

    return wishlistModel.findOneAndUpdate({_user: userId , itemID:productID},
        { $set: {"itemID": productID ,"_user": userId}  },
        {upsert: true, returnNewDocument: true,  setDefaultsOnInsert: true})
        .then(function (status) {
            {
                return status;
            }
        })
}


function removeItem(wID) {
    return wishlistModel.findByIdAndRemove(wID);
}

function getItems(userId) {
    return wishlistModel.find({_user:userId}).populate('wishlistdata')
        .exec(function (err,cartitems) {

            var finalobj={};
            for(var _obj in cartitems)
            {
                for(var key in cartitems[_obj]._doc) {
                    finalobj[key] = cartitems[_obj]._doc[key];
                }
                for(var key in cartitems[_obj].cartdata) {
                    finalobj[key] = cartitems[_obj].cartdata[key];
                }
            }
                return finalobj;
    })
}





