(function () {

    angular
        .module("GroceryApp")
        .controller("AddressListController", AddressListController)

    function AddressListController($location,addressService) {
        var model = this;
        model.addAddress=addAddress;
        model.editAddress=editAddress;
        function init() {
            addressService.getAddressess().then(function (addresses) {
                model.addresses=addresses;
            })
        }

        init();


        function addAddress()
        {
            $location.url("profile/address/new");
        }
        function editAddress(addressId)
        {
            $location.url("profile/address/"+addressId);
        }
    }

})();