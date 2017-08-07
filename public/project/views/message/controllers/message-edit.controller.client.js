(function () {
    angular
        .module("GroceryApp")
        .controller("EditMessageController", EditMessageController);

    function EditMessageController($location, $routeParams) {
        var model = this;

        function init() {
            model.userId = $routeParams.uid;
            model.wid = $routeParams.wid;
        }
        init();
    }
})();