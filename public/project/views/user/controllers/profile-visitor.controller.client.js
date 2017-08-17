(function () {

    angular
        .module("GroceryApp")
        .controller("VisitorProfileController", VisitorProfileController)

    function VisitorProfileController($location, $routeParams,UserService,reviewService) {
        var model = this;
        model.loadProduct=loadProduct;
        function init() {
            model.visitorname=$routeParams.vid;
            UserService.getVisitorInfo(model.visitorname).then(function (visitor) {
                model.user=visitor;
                reviewService.getReviewByUsername(model.visitorname).then(function (reviews){
                    model.reviews=reviews;
                })

            })
        }

        init();

        function loadProduct(itemID) {
            $location.url("/product/"+itemID);
        }


    }

})();