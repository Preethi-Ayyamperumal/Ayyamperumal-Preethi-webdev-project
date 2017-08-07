(function () {

    angular
        .module("GroceryApp")
        .controller("LoginController", LoginController);

    function LoginController($location,$rootScope) {
        var model = this;
        model.login = login;
        model.register = register;
        function init() {

        }

        init();

        function login() {
            $location.url("profile/");
        }

        function register() {
            $location.url("register/");
        }

    }
})();