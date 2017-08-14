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
                        $location.url("/");
                    }).catch( function(err){
                        if(err.data === "Unauthorized")
                            model.errorMessage="Username or Password Incorrect";
                        else
                            model.errorMessage="You are blocked to login. Please contact Administrator.";
            });

        }

        function register() {
            $location.url("register/");
        }

    }
})();