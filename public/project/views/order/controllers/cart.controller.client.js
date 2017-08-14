(function () {
    angular
        .module("GroceryApp")
        .controller("CartViewController", CartViewController);

    function CartViewController($location,orderService ,$routeParams) {
        var model = this;

        model.checkOut=checkOut;
        function init() {
            model.itemID=$routeParams.iID;
            if(model.itemID != 111111){
                model.product= {"ID":model.itemID, "qty":1};
                orderService.updateCart(model.product)
                    .then(function (status) {
                        orderService.getCart().then(function (items) {
                                model.cartItems = items;
                    })
            })
            }
            else
            {
                orderService.getCart().then(function (items) {
                    model.cartItems = items;
                })
            }
        }
        init();
        function checkOut()
        {
            $location.url("profile/checkout");
        }



    }
})();