(function () {
    angular
        .module("GroceryApp")
        .factory("categoryService", categoryService);
    
    function categoryService($http) {
        var api = {
            "updateCategories": updateCategories,
            "getCategories":getCategories
        };
        return api;

        function updateCategories() {
            var url = "/api/category/update/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getCategories() {
            var url = "/api/category/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();