(function () {
    angular
        .module("GroceryApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($location, loggedInUser,UserService,$route) {
        var model = this;
        model.loadVisitorProfile=loadVisitorProfile;
        model.unFollow=unFollow;
        model.getAllUsers=getAllUsers;
        model.isFollowersAvailable = isFollowersAvailable;

        function init() {
            model.user=loggedInUser;
            model.following=[];

            UserService.getFollowing()
                .then(function (users) {
                    model.following=users.following;
                })
        }

        init();

        function loadVisitorProfile(otherUserName)
        {
            $location.url("profile/visitor/"+otherUserName)
        }
        function getAllUsers()
        {
            $location.url("profile/users/");
        }
        function unFollow(username)
        {
            UserService.unFollow(username)
                .then(function (status) {
                    $route.reload();
                })
        }

        function  isFollowersAvailable() {
            if(model.following.length > 0)
                return true
            else
                return false
        }

    }
})();