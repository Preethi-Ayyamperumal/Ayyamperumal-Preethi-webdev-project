(function () {
    angular
        .module("GroceryApp")
        .controller("CartViewController", CartViewController);

    function CartViewController($location,orderService ,$routeParams,searchService) {
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
           /* orderService.getCart()
                .then(function (items) {
                    model.cartItems = items;
                    var index = -1;
                    for(var itemIndex in model.cartItems) {
                        if(model.cartItems[itemIndex].itemID)
                        {
                            if(model.cartItems[itemIndex].itemID == model.itemID)
                        {
                            model.cartItems[itemIndex].quantity+=1;
                            model.product= {"ID":model.itemID, "quantity":model.cartItems[itemIndex].quantity};
                            index=itemIndex;
                            break;}
                    }
                    }
                    if(index === -1)
                    {
                        model.product= {"ID":model.itemID, "quantity":1};
                        model.cartItems.push({'itemID':model.itemID,'quantity':1});
                    }
                    orderService.updateCart(model.product)
                        .then(function (status) {
                               console.log(status);
                             })
                        })*/
        }
        init();
        function checkOut()
        {
            $location.url("profile/checkout");
        }


        init();

    }
})();