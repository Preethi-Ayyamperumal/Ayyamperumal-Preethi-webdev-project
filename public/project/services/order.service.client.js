(function () {
    angular
        .module("GroceryApp")
        .factory("orderService", orderService);
    
    function orderService($http) {
        var api = {
            "updateCart": updateCart,
            "loadProduct":loadProduct,
             "getCart" :getCart,
            "placeOrder":placeOrder,
            "getOrders":getOrders,
            "clearCart": clearCart,
            "getOrderByID":getOrderByID

    };
        return api;

        function updateCart(cartItem) {
            var url = "/api/cart/update/";
            return $http.put(url,cartItem)
                .then(function (response) {
                    if(response.hasOwnProperty("data"))
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

        function placeOrder(order){
            var url="/api/placeOrder/";
            return $http.post(url,order)
                .then(function (response){
                    return response.data;
                })
        }

        function getOrders(){
            var url="/api/orders/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function getOrderByID(orderID){
            var url="/api/order/"+orderID;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function clearCart(){
            var url="/api/cart/";
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                })
        }
    }
})();