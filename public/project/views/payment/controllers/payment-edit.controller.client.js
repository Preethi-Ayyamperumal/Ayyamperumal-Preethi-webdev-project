(function () {

    angular
        .module("GroceryApp")
        .controller("PaymentEditController", PaymentEditController)

    function PaymentEditController($location, $routeParams) {
        var model = this;
        model.updatePayment=updatePayment;
        function init() {
            model.userId=123;
            model.addressId=123;
            model.paymentId=123;
        }

        init();


        function updatePayment(payment)
        {
            $location.url("profile/")
        }
    }

})();