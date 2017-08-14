(function () {

    angular
        .module("GroceryApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($location, UserService,loggedInUser) {
        var model = this;
        model.updateUser = updateUser;
        model.logout = logout;
        model.loadUserWebsites = loadUserWebsites;
        model.loadUserProfile = loadUserProfile;
        model.editAddressWidget=editAddressWidget;
        model.editPaymentWidget=editPaymentWidget;
        model.getFollowers=getFollowers;
        model.getFollowing=getFollowing;
        model.getOrders=getOrders;
        model.getCart=getCart;
        model.getMessageCenter=getMessageCenter;
        model.getReviews=getReviews;
        model.getCategory=getCategory;
        model.getAddress=getAddress;
        model.getPayment=getPayment;
        model.getWishList=getWishList;
        function init() {
            model.user=loggedInUser;

        }

        init();


        function loadUserWebsites() {
            $location.url($location.url() + "/website/");
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    });
        }

        function updateUser(user) {
            UserService.updateUser(user)
                .then(function (response) {

                    loadUserProfile();
                })
        }

        function loadUserProfile() {
            $location.url("/profile/");
        }
        function editAddressWidget()
        {
            $location.url("/profile/" + model.userId+"/address/"+ model.addressId);
        }

        function editPaymentWidget()
        {
            $location.url("/profile/" + model.userId+"/payment/"+ model.paymentId);
        }
        function getFollowers()
        {
            $location.url("/profile/followers/");
        }

        function getFollowing()
        {
            $location.url("/profile/following/");
        }

        function getAddress()
        {
            $location.url("/profile/address/");
        }

        function getPayment()
        {
            $location.url("/profile/payment/");
        }
        function getWishList()
        {
            $location.url("/profile/wishlist/");
        }

        function getOrders()
        {
            $location.url("/profile/order/");
        }
        function getCart()
        {
            $location.url("/profile/cart/"+111111);
        }
        function getMessageCenter()
        {
            $location.url("/profile/message/");
        }
        function getReviews()
        {
            $location.url("/profile/review/");
        }

        function getCategory()
        {
            $location.url("/category/update");
        }


    }

})();