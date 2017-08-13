(function () {
    angular
        .module("GroceryApp")
        .controller("NewReviewController", NewReviewController);

    function NewReviewController($location, $routeParams,reviewService) {
        var model = this;
        model.addReview=addReview;
        model.getReviewList=getReviewList;
        function init() {
            model.pid=$routeParams.pid;
            reviewService.getReviewByUserByProduct(model.pid).then(function(response){
                model.review=response;
            })
        }
        function addReview()
        {
            model.review.itemID=model.pid;
            reviewService.addReview(model.review)
                .then(function(review){
                $location.url("/profile/review");
        });
        }
        function getReviewList(){
            $location.url("/profile/review");
        }
        init();
    }
})();