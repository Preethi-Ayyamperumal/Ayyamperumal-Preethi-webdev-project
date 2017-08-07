(function () {
    angular
        .module("GroceryApp")
        .controller("FollowersController", FollowersController);

    function FollowersController($location, $routeParams) {
        var model = this;
        model.loadVisitorProfile=loadVisitorProfile;
        function init() {
            model.userId=$routeParams.uid;
            model.vId=$routeParams.uid;
        }
        function loadVisitorProfile()
        {
            $location.url("profile/"+model.userId+"/visitor/"+model.vId)
        }
        init();

    }
})();