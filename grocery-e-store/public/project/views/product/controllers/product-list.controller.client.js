(function () {
    angular
        .module("GroceryApp")
        .controller("productListController", productListController);
    
    function productListController($routeParams,searchService,$location) {
        var model = this;

        model.loadProduct=loadProduct;
        function init() {
            model.productname=$routeParams.productName;
            searchService.searchProduct(model.productname)
                .then (function (response) {
                        model.products = response.data.items;
                });
            }
        init();

        function loadProduct(productId){
                    $location.url("/product/"+productId);

        }

    }
})();