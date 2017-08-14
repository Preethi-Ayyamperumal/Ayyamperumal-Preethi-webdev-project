(function () {
    angular
        .module("GroceryApp")
        .controller("OrderListController", OrderListController);

    function OrderListController($location, $routeParams,orderService) {
        var model = this;
model.loadOrder=loadOrder;

        function init() {
            orderService.getOrders().then(function (orders) {
                model.orders=orders;
            })
        }

        init();
function loadOrder(orderID) {
    $location.url("/profile/order/"+orderID);

}
    }
})();