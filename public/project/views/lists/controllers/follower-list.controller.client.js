(function () {
    angular
        .module("GroceryApp")
        .controller("FollowersController", FollowersController);

    function FollowersController($location, UserService) {
        var model = this;
        model.loadVisitorProfile=loadVisitorProfile;
        function init() {
            UserService.getFollowers()
                .then(function (followers) {
                    model.followers=followers;
                })
        }

        init();

        function loadVisitorProfile(username)
        {
            $location.url("profile/visitor/"+username);
        }

    }
})();