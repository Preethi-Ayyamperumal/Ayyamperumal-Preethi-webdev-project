(function () {
    angular
        .module("projectDirectives", [])
        .directive("searchBar",searchBarDirective);

    function searchBarDirective($http,$routeParams) {
        function linkFunction(element) {
        }
        return {
            templateUrl:"./directives/search-bar.html",
            link: linkFunction,
            controller:"searchController",
            scope: {
                products: '='
            },
            bindToController: true,
            controllerAs:"model"
        }
    }

})();