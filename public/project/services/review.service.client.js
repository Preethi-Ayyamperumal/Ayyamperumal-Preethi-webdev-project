(function () {
    angular
        .module("GroceryApp")
        .factory("reviewService", reviewService);
    
    function reviewService($http) {
        var api = {
            "addReview": addReview,
            "deleteReview":deleteReview,
             "updateReview" :updateReview,
            "getReviewforUser":getReviewforUser,
            "getReviewbyID":getReviewbyID,
            "getReviewByUserByProduct":getReviewByUserByProduct,
            "getReviewbyProduct":getReviewbyProduct,

        };
        return api;

        function addReview(review) {
            var url = "/api/user/review/";
            return $http.post(url,review)
                .then(function (response) {
                    if(response.hasOwnProperty("data") && response.data.hasOwnProperty("_id"))
                        return true;
                    else
                        return false;
                });
        }

        function deleteReview(reviewID) {
            var url = "/api/user/review/"+reviewID;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getReviewByUserByProduct(productID) {
            var url = "/api/user/review/product"+productID;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(reviewID,review){
            var url = "/api/review/"+reviewID;
            return $http.put(url,review)
                .then(function (response){
                    return response.data;
                })
        }
        function getReviewforUser(){
            var url="/api/user/review/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }


        function getReviewbyID(reviewID){
            var url="/api/review/"+reviewID;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function getReviewbyProduct(productID){
            var url="/api/product/"+productID +"/review";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }


    }
})();