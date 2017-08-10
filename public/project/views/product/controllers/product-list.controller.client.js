(function () {
    angular
        .module("GroceryApp")
        .controller("ProductListController", ProductListController);
    
    function ProductListController($routeParams,searchService,$location) {
        var model = this;

        model.loadProduct=loadProduct;
        function init() {
            model.productname=$routeParams.productName;
            searchService.searchProduct(model.productname)
                .then (function (response) {
                        model.products = response;
                });
            }
        init();

        function loadProduct(productId){
                    $location.url("/product/"+productId);

        }

    }
})();