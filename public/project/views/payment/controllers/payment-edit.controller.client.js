(function () {

    angular
        .module("GroceryApp")
        .controller("PaymentEditController", PaymentEditController)

    function PaymentEditController($location, $routeParams,paymentService) {
        var model = this;
        model.updatePayment=updatePayment;
        model.deletePayment=deletePayment;

        function init() {
            model.paymentId=$routeParams.payid;
            paymentService.getPaymentbyID(model.paymentId).then(function (payment) {
                model.payment=payment;
            })
        }

        init();


        function updatePayment()
        {
            paymentService.updatePayment(model.paymentId,model.payment).then(function (response) {

                $location.url("profile/payment");

            })
        }


        function deletePayment()
        {
            paymentService.deletePayment(model.paymentId).then(function (res){
            $location.url("profile/payment");
        })

        }
    }

})();