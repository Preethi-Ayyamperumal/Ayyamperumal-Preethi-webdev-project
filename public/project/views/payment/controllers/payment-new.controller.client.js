(function () {

    angular
        .module("GroceryApp")
        .controller("PaymentNewController", PaymentNewController)

    function PaymentNewController($location,paymentService) {
        var model = this;
        model.addPayment=addPayment;
        function init() {
        }

        init();


        function addPayment()
        {
            paymentService.addPayment(model.payment).then(function (response) {
                $location.url("profile/payment")
            })
        }
    }

})();