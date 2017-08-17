(function () {
    angular
        .module("GroceryApp")
        .controller("OrderController", OrderController);

    function OrderController($location, $route,loggedInUser,orderService) {
        var model = this;
        model.loadOrder=loadOrder;
        model.deleteOrder=deleteOrder;
        model.loadUserProfile=loadUserProfile;
        model.updateOrderStatus=updateOrderStatus;
        function init() {
            model.user=loggedInUser;
            orderService.getAllOrders()
                .then(function (orders) {
                    model.orders = orders;
                });

        }

        init();

        function loadOrder(OrderID) {
            $location.url("/profile/order/"+OrderID);
        }
        function loadUserProfile(username) {
            $location.url("/profile/visitor/"+username);
        }

        function updateOrderStatus(OrderID,status) {
            var order={};
            order.status=status;
            orderService.updateOrderStatus(OrderID,order)
                .then(function (status) {
                        $route.reload();
                });
        }
        function deleteOrder(OrderID) {
            orderService.deleteOrderByID(OrderID)
                .then(function (status) {
                    $route.reload();
                })
        }

    }
})();