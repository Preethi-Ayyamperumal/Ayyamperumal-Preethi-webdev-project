(function () {

    angular
        .module("GroceryApp")
        .controller("AddressEditController", AddressEditController)

    function AddressEditController($location, $routeParams,addressService) {
        var model = this;
        model.updateAddress = updateAddress;
        function init() {
            model.addressId = $routeParams.aid;
            addressService.getAddress(model.addressId).then(function (address) {
                model.address = address;
            });

        }

        init();


        function updateAddress() {
            if (model.address.isDefault === true)
                model.address.type = 'DEFAULT';
            else
                model.address.type = 'SECONDARY'
            addressService.editAddress(model.addressId, model.address).then(function (address) {
                $location.url("profile/address");
            })
        }

    }
})();