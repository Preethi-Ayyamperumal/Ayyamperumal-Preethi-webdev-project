(function () {
    angular
        .module("GroceryApp")
        .controller("searchController", searchController);

    function searchController($routeParams,$location) {
        var model = this;
        model.searchProduct=searchProduct;
        function init() {
            model.productname=$routeParams.productName;
        }
        init();

        function searchProduct(productName){
            $location.url("/search/"+productName);
        }
    }
})();