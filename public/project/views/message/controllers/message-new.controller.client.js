(function () {
    angular
        .module("GroceryApp")
        .controller("NewMessageController", NewMessageController);

    function NewMessageController($location, $routeParams) {
        var model = this;
        function init() {
            model.userId = $routeParams.uid;
        }

        init();
    }
})();