(function () {
    angular
        .module("GroceryApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var model = this;
        model.register = register;

        function init() {

        }

        init();

        function register(newuser) {
            if (!newuser || (!newuser.username) || (!newuser.password) || (!newuser.password2)) {
                model.errorMessage = "Enter Username and Passwords";
                return;
            }
            if (newuser.password != newuser.password2) {
                model.errorMessage = "Passwords doesn't match";
                return;
            }
            return UserService
                .findUserByUsername(newuser.username)
                .then(function (status) {
                        model.errorMessage = "sorry, that username is taken";
                        return;
                    },
                    function () {
                        return UserService.register(newuser)
                            .then(function () {
                                $location.url("/profile/");
                            });
                    });
        }}

})();