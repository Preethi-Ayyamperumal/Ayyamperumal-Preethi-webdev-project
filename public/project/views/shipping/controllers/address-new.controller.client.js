(function () {

    angular
        .module("GroceryApp")
        .controller("AddressNewController", AddressNewController)

    function AddressNewController($location, addressService) {
        var model = this;
        model.addAddress=addAddress;
        function init() {

        }

        init();


        function addAddress()
        {
            addressService.addAddress(model.address).then(function (address) {
                $location.url("profile/address");

            })
        }
    }

})();