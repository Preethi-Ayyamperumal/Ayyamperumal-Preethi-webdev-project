(function () {
    angular
        .module("GroceryApp")
        .controller("WishListNewController", WishListNewController);

    function WishListNewController($location,UserService,$routeParams) {
        var model = this;

        model.editItem=editItem;
        model.loadProduct=loadProduct;
        function init() {
            model.itemID=$routeParams.pid;
                UserService.addtoWishList(model.itemID)
                    .then(function (status) {
                        $location.url("/profile/wishlist");

                    })
        }
        init();
        function editItem(itemID)
        {
            UserService.deleteWishListItem(itemID).then(function (status) {
                $location.url("profile/wishlist/");
            })
        }

        function loadProduct(productID) {
            $location.url("profile/"+productID);

        }


        init();

    }
})();