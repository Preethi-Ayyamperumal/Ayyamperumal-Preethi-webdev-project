(function () {
    angular
        .module("GroceryApp")
        .controller("NewReviewController", NewReviewController);

    function NewReviewController($location, $routeParams) {
        var model = this;
        function init() {
            model.userId = $routeParams.uid;
            model.ratingValue=0;
        }

        init();
    }
})();