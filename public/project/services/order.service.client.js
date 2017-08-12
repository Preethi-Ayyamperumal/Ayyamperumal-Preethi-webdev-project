(function () {
    angular
        .module("GroceryApp")
        .factory("orderService", orderService);
    
    function orderService($http) {
        var api = {
            "updateCart": updateCart,
            "loadProduct":loadProduct,
             "getCart" :getCart
        };
        return api;

        function updateCart(cartItem) {
            var url = "/api/cart/update/";
            return $http.put(url,cartItem)
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

        function getCart(){
            var url="/api/cart/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }
    }
})();