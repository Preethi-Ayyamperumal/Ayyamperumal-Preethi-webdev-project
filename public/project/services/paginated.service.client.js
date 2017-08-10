(function () {
    angular
        .module("GroceryApp")
        .factory("paginatedService", paginatedService);
    
    function paginatedService($http) {
        var api = {
            "getProducts":getProducts
        };
        return api;

        function getProducts(categoryID) {
            var url = "/api/paginated/" +categoryID;
            return $http.get(url)
                .then(function (response) {
                    return response.data.items;
                });
        }

    }
})();