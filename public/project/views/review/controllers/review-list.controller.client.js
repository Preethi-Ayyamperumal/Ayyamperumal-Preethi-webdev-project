(function () {
    angular
        .module("GroceryApp")
        .controller("ReviewListController", ReviewListController);

    function ReviewListController($location, reviewService) {
        var model = this;
        model.editReview=editReview;

        function init() {
            reviewService.getReviewforUser().then(function(reviews){
                model.reviews=reviews;
            })
        }
        function editReview(reviewID){
            $location.url("profile/review/"+ reviewID);
        }

        init();

    }
})();