(function () {
    angular
        .module("GroceryApp")
        .controller("WishListNewController", WishListNewController);

    function WishListNewController($location,UserService,$routeParams) {
        var model = this;

        model.editItem=editItem;
        model.loadProduct=loadProduct;
        model.getProductPage=getProductPage;
        function init() {
            model.itemID=$routeParams.pid;
                UserService.addtoWishList(model.itemID)
                    .then(function (status) {
                        // $location.url("/profile/wishlist");
                        UserService.getWishList()
                            .then(function (wishlist) {
                                model.wishlist = wishlist;
                            })
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
            $location.url("product/"+productID);

        }
        function getProductPage() {
            $location.url("product/"+model.itemID);
        }


        init();

    }
})();