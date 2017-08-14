(function () {
    angular
        .module("GroceryApp")
        .controller("OrderViewController", OrderViewController);

    function OrderViewController($location,$routeParams, orderService,paymentService,addressService) {
        var model = this;
        function init()
        {
            model.orderid=$routeParams.oid;
            orderService.getOrderByID(model.orderid).then(function (order) {
                model.order=order;
                paymentService.getPaymentbyID(model.order.payment_details)
                        .then(function (payment) {
                            model.payment = payment;
                            addressService.getAddress(model.order.shipping_address).then(function (address) {
                                model.address = address;
                            })
                        })
                });

        }
        init();

    }
})();