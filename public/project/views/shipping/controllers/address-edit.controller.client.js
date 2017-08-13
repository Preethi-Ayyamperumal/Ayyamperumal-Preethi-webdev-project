(function () {

    angular
        .module("GroceryApp")
        .controller("AddressEditController", AddressEditController)

    function AddressEditController($location, $routeParams,addressService) {
        var model = this;
        model.updateAddress=updateAddress;
        model.deleteAddress=deleteAddress;

        function init() {
            model.addressId=$routeParams.aid;
            addressService.getAddress(model.addressId).then(function (address) {
                model.address=address;
            });

        }

        init();


        function updateAddress()
        {
            addressService.editAddress(model.addressId,model.address).then(function (address) {
                $location.url("profile/address");
            })
        }

        function deleteAddress()
        {
            addressService.deleteAddress(model.addressId).then(function (status) {
                $location.url("profile/address");
            })}

    }

})();