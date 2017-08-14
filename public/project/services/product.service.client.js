(function () {
    angular
        .module("GroceryApp")
        .factory("searchService", searchService);
    
    function searchService($http) {
        var api = {
            "searchProduct": searchProduct,
            "loadProduct":loadProduct,
            "insertProduct":insertProduct,
            "getAllProducts":getAllProducts,
            "deleteProduct":deleteProduct

        };
        return api;

        function searchProduct(productName) {
            productName = productName.replace(/\s\s*/g, '+');
            var url = "/api/product/searchByName/"+productName;
            return $http.get(url)
                .then(function (response) {
                    return response.data.items;
                });
        }

        function loadProduct(productId) {
            var url = "/api/product/searchById/"+productId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function insertProduct(product) {
            var url = "/api/product/insert/";
            return $http.put(url,product)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllProducts() {
            var url = "/api/product/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteProduct(productID) {
            var url = "/api/product/"+productID;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();