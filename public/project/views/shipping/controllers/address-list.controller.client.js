(function () {

    angular
        .module("GroceryApp")
        .controller("AddressListController", AddressListController)

    function AddressListController($location,addressService,$route) {
        var model = this;
        model.addAddress=addAddress;
        model.editAddress=editAddress;
        model.deleteAddress = deleteAddress;
        model.setDefaultAddress = setDefaultAddress;
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

        function deleteAddress(addressId) {
            addressService.deleteAddress(addressId).then(function (status) {
                $route.reload();
            })
        }


        function setDefaultAddress(addressID) {
            addressService.setDefaultAddress(addressID).then(function (status) {
                $route.reload();
            })
        }
    }

})();