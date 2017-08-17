(function () {

    angular
        .module("GroceryApp")
        .controller("PaymentListController", PaymentListController)

    function PaymentListController($location, paymentService,$route) {
        var model = this;
        model.addNewPayment=addNewPayment;
        model.editPayment=editPayment;
        model.deletePayment=deletePayment;
        model.setDefaultPayment=setDefaultPayment;
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


        function deletePayment(paymentID) {
            paymentService.deletePayment(paymentID).then(function (status) {
                $route.reload();
            })
        }


        function setDefaultPayment(paymentID) {
            paymentService.setDefaultPayment(paymentID).then(function (status) {
                $route.reload();
            })
        }
    }

})();