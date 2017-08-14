(function () {
    angular
        .module("GroceryApp")
        .controller("CustomerController", CustomerController);

    function CustomerController($location, $route,UserService) {
        var model = this;
        model.saveCustomer=saveCustomer;
        model.deleteCustomer=deleteCustomer;
        model.addCustomer=addCustomer;
        model.register=register;
        function init() {
            model.showNewCustomerDiv=false;
            UserService.getUsersByRole('CUSTOMER')
                .then(function (users) {
                    model.customers = users;
                });
        }
        init();

        function saveCustomer(CustomerID,customer)
        {
                UserService.updateUserAuthorized(CustomerID,customer)
                    .then(function (status) {
                        $route.reload();
                    })
        }

        function addCustomer(CustomerID,customer)
        {
            model.showNewCustomerDiv=true;
        }

        function register()
        {
            model.user.password=model.user.username;
            model.user.password2=model.user.username;
            return UserService
                .findUserByUsername(model.user.username)
                .then(function (status) {
                        model.errorMessage = "sorry, that username is taken";
                        return;
                    },
                    function () {
                        return UserService.addUser(model.user)
                            .then(function () {
                                $route.reload();
                            });
                    });   }


        function deleteCustomer(CustomerID) {
            UserService.deleteUserAuthorised(CustomerID)
                .then(function (status) {
                    $route.reload();
                })}

    }
})();