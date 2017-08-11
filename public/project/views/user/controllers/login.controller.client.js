(function () {

    angular
        .module("GroceryApp")
        .controller("LoginController", LoginController);

    function LoginController($location,UserService) {
        var model = this;
        model.login = login;
        model.register = register;
        function init() {

        }

        init();

        function login(user) {
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $location.url("/profile");
                    }).catch( function(err){
               model.errorMessage="Username or Password Incorrect";
            });

        }

        function register() {
            $location.url("register/");
        }

    }
})();