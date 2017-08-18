(function () {
    angular
        .module("GroceryApp")
        .controller("ManagerController", ManagerController);

    function ManagerController($location, $route,UserService) {
        var model = this;
        model.saveManager=saveManager;
        model.deleteManager=deleteManager;
        model.addManager=addManager;
        model.register=register;
        function init() {
            model.showNewManagerDiv=false;
            UserService.getUsersByRole('MANAGER')
                .then(function (users) {
                    model.managers = users;
                });
        }
        init();

        function saveManager(ManagerID,manager)
        {
            UserService.updateUserAuthorized(ManagerID,manager)
                .then(function (status) {
                    $route.reload();
                })
        }

        function addManager(ManagerID,manager)
        {
            model.showNewManagerDiv=true;
        }

        function register()
        {
            model.user.password=model.user.username;
            model.user.password2=model.user.username;
            return UserService
                .findUserByUsername(model.user.username)
                .then(function (status) {
                        model.errorMessage = "sorry, that username is taken";

                    },
                    function () {
                        return UserService.addUser(model.user)
                            .then(function () {
                                $route.reload();
                            });
                    });   }


        function deleteManager(ManagerID) {
            UserService.deleteUserAuthorised(ManagerID)
                .then(function (status) {
                    $route.reload();
                })}

    }
})();