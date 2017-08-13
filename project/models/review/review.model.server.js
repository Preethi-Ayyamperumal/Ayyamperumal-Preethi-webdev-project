var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("reviewModel", reviewSchema);
reviewModel.getReview = getReview;
reviewModel.findReviewById = findReviewById;
reviewModel.addReview = addReview;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;
reviewModel.getReviewByUserByPID=getReviewByUserByPID;
reviewModel.getReviewForProduct=getReviewForProduct;
module.exports = reviewModel;

/*function getReview(userID) {
    return reviewModel.find({_user: userID});
}*/


function getReview(userId) {
    return reviewModel.find({reviewed_by:userId}).populate('reviewdata')
        .exec(function (err,reviewItems) {
            var returndata=[];

            var finalobj={};
            for(var _obj in reviewItems)
            {
                finalobj={};
                for(var key in reviewItems[_obj].reviewdata._doc) {
                    finalobj[key] = reviewItems[_obj].reviewdata._doc[key];
                }
                for(var key in reviewItems[_obj]._doc) {
                    finalobj[key] = reviewItems[_obj]._doc[key];
                }

                returndata.push(finalobj);
            }
            return returndata;
        })
}

function getReviewForProduct(productID) {
    return reviewModel.find({itemID:productID}).populate('reviewdata')
        .exec(function (err,reviewItems) {
            var returndata=[];

            var finalobj={};
            for(var _obj in reviewItems)
            {
                finalobj={};
                for(var key in reviewItems[_obj].reviewdata._doc) {
                    finalobj[key] = reviewItems[_obj].reviewdata._doc[key];
                }
                for(var key in reviewItems[_obj]._doc) {
                    finalobj[key] = reviewItems[_obj]._doc[key];
                }

                returndata.push(finalobj);
            }
            return returndata;
        })
}

function getReviewByUserByPID(userID,productID) {
    return reviewModel.find({reviewed_by: userID,itemID:productID});
}
function updateReview(reviewID,review) {
    return reviewModel.update({_id: reviewID},
        {$set: review});
}

function deleteReview(reviewID) {
    return reviewModel.findByIdAndRemove(reviewID);
}

function addReview(userID,username,review) {
    review.reviewed_by=userID;
    review.reviewer_username=username;
    return reviewModel.create(review);
}

function findReviewById(reviewID) {
    return reviewModel.findById(reviewID).populate('reviewdata')
        .exec(function (err,reviewItem) {
                return reviewItem;
        })
}
