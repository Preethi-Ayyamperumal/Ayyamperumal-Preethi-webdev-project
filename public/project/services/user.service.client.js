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
            "getVisitorInfo":getVisitorInfo,
            "updateUser":updateUser,
            "checkLogin" : checkLogin,
            "unFollow" :unFollow,
            "followUsers":followUsers,
            "getFollowing":getFollowing,
            "getUserstoFollow":getUserstoFollow,
            "getFollowers":getFollowers,
            "getWishList":getWishList,
            "deleteWishListItem":deleteWishListItem,
            "addtoWishList":addtoWishList,
            "getUsersByRole":getUsersByRole,
            "addUser":addUser,
            "deleteUserAuthorised":deleteUserAuthorised,
            "updateUserAuthorized":updateUserAuthorized,
            "unRegister":unRegister


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


        function addUser(user) {
            return $http.post("/api/user/add", user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getVisitorInfo(username) {
            var url = "/api/visitor/"+username;
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

        function updateUserAuthorized(userID,user) {
            var url = "/api/manage/user/"+userID;
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUserAuthorised(userID) {
            var url = "/api/manage/user/"+userID;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unRegister() {
            var url = "/api/user/";
            return $http.delete(url)
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

        function unFollow(username){
        return $http.get('/api/unfollow/'+username)
            .then(function(response) {
                return response;
            });
         }


        function getFollowing(){
            return $http.get('/api/following')
                .then(function(response) {
                    return response.data;
                });
        }

        function getFollowers(){
            return $http.get('/api/followers')
                .then(function(response) {
                    return response.data;
                });
        }
        function getUsersByRole(role){
            return $http.get('/api/users/role/'+role)
                .then(function(response) {
                    return response.data;
                });
        }

        function followUsers(selectedUsers){
            return $http.put('/api/follow/',selectedUsers)
                .then(function(response) {
                    return response;
                });
        }

        function getUserstoFollow() {
            return $http.get('/api/tofollow')
                .then(function(response) {
                    return response.data;
                });
        }

        function getWishList(){
            return $http.get('/api/wishlist')
                .then(function(response) {
                    return response.data;
                });
        }

        function deleteWishListItem(itemID) {
            return $http.delete('/api/wishlist/'+itemID)
                .then(function(response) {
                    return response.data;
                });
        }

        function addtoWishList(productID){
            return $http.get('/api/wishlist/'+productID)
                .then(function(response) {
                    return response.data;
                });
        }


    }
})();