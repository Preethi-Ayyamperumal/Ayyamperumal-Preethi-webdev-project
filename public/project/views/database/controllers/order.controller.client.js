(function () {
    angular
        .module("GroceryApp")
        .controller("OrderController", OrderController);

    function OrderController($location, loggedInUser,UserService) {
        var model = this;
        model.followUsers=followUsers;
        model.stateChanged=stateChanged;
        function init() {
            model.user=loggedInUser;
            UserService.getUserstoFollow()
                .then(function (users) {
                    model.otherUsers = users;
                });
            model.selectedUsers=[];

        }

        init();

        function followUsers()
        {
            if(model.selectedUsers.length) {
                UserService.followUsers(model.selectedUsers)
                    .then(function (status) {
                        $location.url("profile/following/");
                    })
            }
            else
            {
                model.errorMessage="Select Users to Follow";
            }

        }

        function stateChanged(username) {
            var index=model.selectedUsers.indexOf(username);
            if( index != -1)
                model.selectedUsers.splice(index,1);
            else
                model.selectedUsers.push(username);
        }

    }
})();