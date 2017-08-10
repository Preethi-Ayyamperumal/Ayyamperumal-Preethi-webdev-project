(function () {
    angular
        .module("GroceryApp")
        .factory("orderService", orderService);
    
    function orderService($http) {
        var api = {
            "addtoCart": addtoCart,
            "loadProduct":loadProduct
        };
        return api;

        function addtoCart(productID) {
            var url = "/api/cart/add/"+productID;
            return $http.get(url)
                .then(function (response) {
                    if(response.hasOwnProperty("data") && response.data.hasOwnProperty("_id"))
                        return true;
                    else
                        return false;
                });
        }

        function loadProduct(productId) {
            var url = "/api/product/searchById/"+productId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();