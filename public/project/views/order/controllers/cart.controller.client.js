(function () {
    angular
        .module("GroceryApp")
        .controller("CartViewController", CartViewController);

    function CartViewController($location, $routeParams) {
        var model = this;

        model.checkOut=checkOut;
        function init() {
            model.userId = $routeParams.uid;

        }
        function checkOut()
        {
            $location.url("profile/"+model.userId+"/checkout");
        }
        init();

    }
})();