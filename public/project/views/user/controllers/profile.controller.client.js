(function () {

    angular
        .module("GroceryApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($location, UserService,loggedInUser) {
        var model = this;
        model.updateUser = updateUser;
        model.logout = logout;
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
        model.unRegister=unRegister;
        function init() {
            model.user=loggedInUser;
            model.user.dob=new Date(loggedInUser.dob);
        }

        init();


        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
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
            $location.url("/profile/address/");
        }

        function editPaymentWidget()
        {
            $location.url("/profile/payment/");
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
            $location.url("/profile/cart/");
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
        function unRegister() {
            UserService.unRegister().then(function (status) {
                 $location.url("/")
            })
        }

    }

})();