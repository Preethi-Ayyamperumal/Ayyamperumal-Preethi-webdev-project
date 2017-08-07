(function () {
    angular
        .module("GroceryApp")
        .controller("OrdersViewController", OrdersViewController);

    function OrdersViewController($location, $routeParams) {
        var model = this;


        function init() {
            model.userId = $routeParams.uid;

        }

        init();

    }
})();