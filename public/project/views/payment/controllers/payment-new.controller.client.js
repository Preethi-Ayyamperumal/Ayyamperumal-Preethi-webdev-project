(function () {

    angular
        .module("GroceryApp")
        .controller("PaymentNewController", PaymentNewController)

    function PaymentNewController($location,paymentService,$filter) {
        var model = this;
        model.addPayment=addPayment;
        function init() {
        }

        init();


        function addPayment()
        {
            if(!model.payment)
            {
                model.errorMessage="All Fields are required";
                return;
            }

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
            paymentService.addPayment(model.payment).then(function (response) {
                $location.url("profile/payment")
            })
        }
    }

})();