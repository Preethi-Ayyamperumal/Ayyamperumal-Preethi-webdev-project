(function () {
    angular
        .module("GroceryApp")
        .controller("ProductController", ProductController);

    function ProductController($location, $route,searchService) {
        var model = this;
        model.saveProduct=saveProduct;
        model.deleteProduct=deleteProduct;
        model.addProduct=addProduct;
        model.searchWalmart=searchWalmart;
        model.loadProduct=loadProduct;
        function init() {
            model.showProductSearch=false;
            searchService.getAllProducts()
                .then(function (users) {
                    model.products = users;
                });
        }
        init();

        function saveProduct(ProductID,manager)
        {
            searchService.updateUserAuthorized(ProductID,manager)
                .then(function (status) {
                    $route.reload();
                })
        }

        function addProduct()
        {
            model.showProductSearch=true;

        }

        function searchWalmart()
        {
            $location.url("/products/add");

        }



        function loadProduct(productID) {
            $location.url("/product/"+productID);
        }

        function deleteProduct(productID) {
            searchService.deleteProduct(productID)
                .then(function (status) {
                    $route.reload();
                })
        }

    }
})();