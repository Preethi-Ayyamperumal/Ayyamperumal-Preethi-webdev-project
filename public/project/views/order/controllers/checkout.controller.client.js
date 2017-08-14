(function () {
    angular
        .module("GroceryApp")
        .controller("CheckoutController", CheckoutController);

    function CheckoutController($location, orderService,paymentService,addressService) {
        var model = this;
        model.placeOrder=placeOrder;
        function init()
        {
            model.grand_total=0;
            model.sub_total=0;
            orderService.getCart()
                .then(function (items) {
                    model.cartItems = items;
                    for (var cartItem in model.cartItems) {
                        model.cartItems[cartItem].subTotal = model.cartItems[cartItem].quantity * model.cartItems[cartItem].salePrice;
                        model.sub_total+=model.cartItems[cartItem].subTotal;

                    }
                    model.sub_total=model.sub_total.toFixed(2);
                    model.shipping=3;
                    model.grand_total=parseFloat(model.sub_total)+ parseFloat(model.shipping);
                    model.grand_total=model.grand_total.toFixed(2);
                    paymentService.getDefaultPayment()
                        .then(function (payment) {
                            model.payment = payment;
                            addressService.getDefaultAddress().then(function (address) {
                                model.address = address;
                            })
                        })
                });

        }
        init();

        function placeOrder() {
            var order={};
            var lineItems=[];
            for (var cartItem in model.cartItems) {
                lineItems.push({'item_name':model.cartItems[cartItem].name,'quantity':model.cartItems[cartItem].quantity})
            }
            order.line_items=lineItems;
            order.shipping_address=model.address._id;
            order.payment_details=model.payment._id;
            order.subtotal=parseFloat(model.sub_total);
            order.total_shipping=model.shipping;
            order.grand_total=model.grand_total;

            orderService.placeOrder(order).then(function (status) {
                orderService.clearCart().then(function (status) {
                    $location.url("/profile/order");
                })
            })

        }

    }
})();