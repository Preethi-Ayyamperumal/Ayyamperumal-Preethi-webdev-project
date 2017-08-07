(function () {
    angular
        .module("GroceryApp")
        .controller("CheckoutController", CheckoutController);

    function CheckoutController($location, $routeParams) {
        var model = this;
        model.getCart=getCart;
        model.changeAddress=changeAddress;
        function init() {
            model.userId = $routeParams.uid;
        }
        init();
        function getCart()
        {
            $location.url("/profile/" + model.userId+"/cart/");
        }
        function changeAddress()
        {
            $location.url("/profile/" + model.userId+"/address/");
        }
    }
})();