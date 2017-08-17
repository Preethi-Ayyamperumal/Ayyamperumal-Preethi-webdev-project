(function () {
    angular
        .module("GroceryApp")
        .controller("CartAddController", CartAddController);

    function CartAddController($location,orderService ,$routeParams) {
        var model = this;

        model.checkOut=checkOut;
        model.loadProduct=loadProduct;
        function init() {
            model.itemID=$routeParams.iID;
                model.product= {"ID":model.itemID, "qty":1};
                orderService.updateCart(model.product)
                    .then(function (status) {
                        orderService.getCart().then(function (items) {
                            model.cartItems = items;
                        })})
        }
        init();
        function checkOut()
        {
            $location.url("profile/checkout");
        }

        function loadProduct(itemID) {
            $location.url("product/"+itemID);
        }



    }
})();