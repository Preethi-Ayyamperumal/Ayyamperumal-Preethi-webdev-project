var app = require("../../express");
var reviewModel = require("../models/review/review.model.server");

// http handlers
app.get("/api/review/:reviewId", findReviewById);
app.get("/api/user/review", getReview);
app.get("/api/user/review/product/:productId", getReviewByUserByPID);
app.get("/api/product/:productID/review",getReviewForProduct )
app.post("/api/user/review", addReview);
app.put("/api/review/:reviewId", updateReview);
app.delete("/api/user/review/:reviewId", deleteReview);



function updateReview(req, res) {
    var reviewId = req.params.reviewId;
    var review=req.body;

    reviewModel
        .updateReview(reviewId,review)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function addReview(req, res) {
    var user = req.user;
    var review=req.body;
    reviewModel
        .addReview(user._id,user.username,review)
        .then(function (user) {
            res.json(user);
        })
}

function getReviewForProduct(req, res) {
    var productID = req.params.productID;
    reviewModel
        .getReviewForProduct(productID)
        .then(function (reviewItems) {
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
            res.json(returndata);

        });

}

function getReview(req, res) {
    var user = req.user;
    reviewModel
        .getReview(user._id)
        .then(function (reviewItems) {
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
            res.json(returndata);

        });

}


function getReviewByUserByPID(req, res) {
    var user = req.user;
    var productId = req.params.productId;
    reviewModel
        .getReviewByUserByPID(user._id,productId)
        .then(function (review) {
            res.json(review);

        });

}


function deleteReview(req, res) {
    var reviewId = req.params.reviewId;


    reviewModel
        .deleteReview(reviewId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}



function findReviewById(req, res) {
    var reviewId = req.params.reviewId;
    reviewModel
        .findReviewById(reviewId)
        .then(function (reviewItem) {
            if(reviewItem === null)
                res.status(200).json({ error: 'message' });
            else
            {
                var finalobj={};
                for(var key in reviewItem.reviewdata._doc) {
                    finalobj[key] = reviewItem.reviewdata._doc[key];
                }
                for(var key in reviewItem._doc) {
                    finalobj[key] = reviewItem._doc[key];
                }

                res.json(finalobj);
            }
            return;
        }, function (err) {
            res.status(200).json({ error: 'message' });
        });
}