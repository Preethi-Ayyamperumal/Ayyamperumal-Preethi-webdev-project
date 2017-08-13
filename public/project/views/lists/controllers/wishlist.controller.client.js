(function () {
    angular
        .module("GroceryApp")
        .controller("WishListViewController", WishListViewController);

    function WishListViewController($location,UserService,$route) {
        var model = this;

        model.removeItem=removeItem;
        model.loadProduct=loadProduct;
        function init() {
                    UserService.getWishList()
                        .then(function (wishlist) {
                            model.wishlist = wishlist;
                }

            )

        }
        init();
        function removeItem(itemID)
        {
            UserService.deleteWishListItem(itemID).then(function (status) {
                $route.reload();
            })
        }

        function loadProduct(productID) {
            $location.url("product/"+productID);

        }


        init();

    }
})();