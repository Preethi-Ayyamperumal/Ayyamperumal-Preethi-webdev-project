(function () {
    angular
        .module("GroceryApp")
        .factory("addressService", addressService);
    
    function addressService($http) {
        var api = {
            "editAddress": editAddress,
            "addAddress":addAddress,
             "getAddressess" :getAddressess,
            "deleteAddress":deleteAddress,
            "getAddress" :getAddress,
            "getDefaultAddress":getDefaultAddress

        };
        return api;

        function editAddress(addressID,address) {
            var url = "/api/address/"+addressID;
            return $http.put(url,address)
                .then(function (response) {
                    if(response.hasOwnProperty("data") && response.data.hasOwnProperty("_id"))
                        return true;
                    else
                        return false;
                });
        }

        function addAddress(address) {
            var url = "/api/address";
            return $http.post(url,address)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteAddress(addressID) {
            var url = "/api/address/"+addressID;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function getAddress(addressID) {
            var url = "/api/address/"+addressID;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function getDefaultAddress() {
            var url = "/api/addressdefault/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function getAddressess(){
            var url = "/api/address/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }
    }
})();