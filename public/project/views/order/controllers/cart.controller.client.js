(function () {
    angular
        .module("GroceryApp")
        .controller("CartViewController", CartViewController);

    function CartViewController($location,orderService) {
        var model = this;
        model.loadProduct=loadProduct;
        model.checkOut=checkOut;
        function init() {
            orderService.getCart().then(function (items) {
                model.cartItems = items;
            })}

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