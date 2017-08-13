(function () {

    angular
        .module("GroceryApp")
        .controller("PaymentListController", PaymentListController)

    function PaymentListController($location, paymentService) {
        var model = this;
        model.addNewPayment=addNewPayment;
        model.editPayment=editPayment;
        function init() {
            paymentService.getAllPayment().then(function (payments) {
                model.payments=payments;
            })
        }

        init();


        function addNewPayment()
        {
            $location.url("profile/payment/new")
        }
        function editPayment(paymentID)
        {
            $location.url("profile/payment/"+paymentID);
        }
    }

})();