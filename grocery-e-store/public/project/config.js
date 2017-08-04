(function () {

    angular
        .module("GroceryApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
              .when("/search/:productName", {
                templateUrl: "views/product/templates/product-list.view.client.html",
                controller: "productListController",
                 controllerAs: "model"
             })
            .when("/product/:productId", {
                templateUrl: "views/product/templates/product-detail.view.client.html",
                controller: "productDetailController",
                controllerAs: "model"
            })
    }
})();