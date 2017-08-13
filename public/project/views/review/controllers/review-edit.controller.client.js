(function () {
    angular
        .module("GroceryApp")
        .controller("EditReviewController", EditReviewController);

    function EditReviewController($location, $routeParams,reviewService) {
        var model = this;
        model.saveReview=saveReview;
        model.deleteReview=deleteReview;
        function init() {
            model.rid = $routeParams.rid;
            reviewService.getReviewbyID(model.rid)
                .then(function(review){
                    model.review=review;
                })
         }
        init();

        function saveReview(){
            reviewService.updateReview(model.rid,model.review)
                .then(function (response) {
                    $location.url("/profile/review");
                })
        }

        function deleteReview(){
            reviewService.deleteReview(model.rid)
                .then(function (review) {
                    $location.url("/profile/review");
                })
        }
    }
})();