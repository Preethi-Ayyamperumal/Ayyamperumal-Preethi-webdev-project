(function () {
    angular
        .module("GroceryApp")
        .controller("CheckoutController", CheckoutController);

    function CheckoutController($location, orderService,paymentService,addressService) {
        var model = this;
        model.placeOrder=placeOrder;
        model.loadProduct=loadProduct;
        function init()
        {
            model.grand_total=0;
            model.sub_total=0;
            model.message=undefined;
            orderService.getCart()
                .then(function (items) {
                    if(items)
                    {
                    model.cartItems = items;
                    for (var cartItem in model.cartItems)
                    {
                        model.cartItems[cartItem].subTotal = model.cartItems[cartItem].quantity * model.cartItems[cartItem].salePrice;
                        model.sub_total+=model.cartItems[cartItem].subTotal;
                        model.cartItems[cartItem].subTotal = model.cartItems[cartItem].subTotal.toFixed(2);
                    }
                    model.sub_total=model.sub_total.toFixed(2);
                    model.shipping=3;
                    model.grand_total=parseFloat(model.sub_total)+ parseFloat(model.shipping);
                    model.grand_total=model.grand_total.toFixed(2);
                    paymentService.getDefaultPayment()
                        .then(function (payment)
                        {
                            model.payment = payment;
                            addressService.getDefaultAddress().then(function (address)
                            {
                                model.address = address;
                            })
                        })
                }}

                );

        }
        init();

        function placeOrder() {
            if(model.cartItems)
            {
            var order={};
            var lineItems=[];
            for (var cartItem in model.cartItems) {
                lineItems.push({'item_name':model.cartItems[cartItem].name,'quantity':model.cartItems[cartItem].quantity})
            }
            order.line_items=lineItems;
            if(!model.address)
            {
                model.errorMessage="Shipping address required. Complete your profile";
                return;
            }
            order.shipping_address=model.address._id;
            if(!model.payment)
            {
                model.errorMessage="Payment details required. Complete your profile";
                return;
            }
            order.payment_details=model.payment._id;
            order.subtotal=parseFloat(model.sub_total);
            order.total_shipping=model.shipping;
            order.grand_total=model.grand_total;

            orderService.placeOrder(order).then(function (status) {
                orderService.clearCart().then(function (status) {
                    model.message="Order Successful";
                   model.cartItems=undefined;
                })
            })

        }}

        function loadProduct(itemID) {
            $location.url("product/"+itemID);
        }


    }
})();