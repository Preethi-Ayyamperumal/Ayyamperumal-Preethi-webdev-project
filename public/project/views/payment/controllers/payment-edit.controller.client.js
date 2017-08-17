(function () {

    angular
        .module("GroceryApp")
        .controller("PaymentEditController", PaymentEditController)

    function PaymentEditController($location, $routeParams,paymentService,$filter) {
        var model = this;
        model.updatePayment=updatePayment;
        model.deletePayment=deletePayment;

        function init() {
            model.paymentId=$routeParams.payid;
            paymentService.getPaymentbyID(model.paymentId).then(function (payment) {
                model.payment=payment;
                model.payment.expiry=new Date(payment.expirationYear,payment.expirationMonth);
            })
        }

        init();


        function updatePayment()
        {
            if(!model.payment.nameOnCard)
            {
                model.errorMessage="Name On Card is a Required Field";
                return;
            }
            if(!model.payment.cardNumber)
            {
                model.errorMessage="Card Number is a Required Field";
                return;
            }
            if(!model.payment.expiry)
            {
                model.errorMessage="Expiry date is a Required Field";
                return;
            }
            model.payment.expirationMonth=$filter('date')(model.payment.expiry, 'M');
            model.payment.expirationYear=$filter('date')(model.payment.expiry, 'yyyy');
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