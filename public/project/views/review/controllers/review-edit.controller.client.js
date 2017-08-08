(function () {
    angular
        .module("GroceryApp")
        .controller("EditReviewController", EditReviewController);

    function EditReviewController($location, $routeParams) {
        var model = this;

        function init() {
            model.userId = $routeParams.uid;
            model.wid = $routeParams.wid;
        }
        init();
    }
})();