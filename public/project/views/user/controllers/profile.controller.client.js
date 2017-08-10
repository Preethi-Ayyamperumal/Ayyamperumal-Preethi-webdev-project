(function () {

    angular
        .module("GroceryApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($location, $routeParams) {
        var model = this;
        model.updateUser = updateUser;
        model.logoutUser = logoutUser;
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
        function init() {
            model.userId=123;
            model.addressId=123;
            model.paymentId=123;
        }

        init();


        function loadUserWebsites() {
            $location.url($location.url() + "/website/");
        }

        function logoutUser() {
            $location.url("/login");
        }

        function updateUser(user) {
            UserService.updateUser(model.userId, user)
                .then(function (response) {
                    loadUserProfile();
                })
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
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
            $location.url("/profile/" + model.userId+"/followers/");
        }

        function getFollowing()
        {
            $location.url("/profile/" + model.userId+"/following/");
        }

        function getOrders()
        {
            $location.url("/profile/" + model.userId+"/orders/");
        }
        function getCart()
        {
            $location.url("/profile/" + model.userId+"/cart/");
        }
        function getMessageCenter()
        {
            $location.url("/profile/" + model.userId+"/message/");
        }
        function getReviews()
        {
            $location.url("/profile/" + model.userId+"/review/");
        }

        function getCategory()
        {
            $location.url("/category/update");
        }


    }

})();