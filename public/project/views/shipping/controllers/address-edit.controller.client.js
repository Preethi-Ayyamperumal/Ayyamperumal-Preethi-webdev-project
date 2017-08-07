(function () {

    angular
        .module("GroceryApp")
        .controller("AddressEditController", AddressEditController)

    function AddressEditController($location, $routeParams) {
        var model = this;
        model.updateAddress=updateAddress;
        function init() {
            model.userId=123;
            model.addressId=123;
        }

        init();


        function updateAddress(address)
        {
            $location.url("profile/")
        }
    }

})();