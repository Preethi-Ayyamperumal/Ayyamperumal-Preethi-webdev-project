(function () {
    angular
        .module("GroceryApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "login": login,
            "logout":logout,
            "register":register,
            "findUserByUsername":findUserByUsername,
            "updateUser":updateUser,
            "checkLogin" : checkLogin
        };
        return api;

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(user) {
            var url = "/api/user";
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLogin(){
            return $http.get('/api/loggedin')
                .then(function(response) {
                    return response.data;
                });
        }


    }
})();