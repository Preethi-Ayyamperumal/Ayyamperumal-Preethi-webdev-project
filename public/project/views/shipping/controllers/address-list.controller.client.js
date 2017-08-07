(function () {

    angular
        .module("GroceryApp")
        .controller("AddressListController", AddressListController)

    function AddressListController($location, $routeParams) {
        var model = this;
        model.updateAddress=updateAddress;
        model.editAddress=editAddress;
        function init() {
            model.userId=123;
            model.addressId=123;
        }

        init();


        function updateAddress(address)
        {
            $location.url("profile/")
        }
        function editAddress()
        {
            $location.url("profile/"+model.userId+"/address/"+model.addressId);
        }
    }

})();