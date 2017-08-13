(function () {
    angular
        .module("GroceryApp")
        .controller("EditMessageController", EditMessageController);

    function EditMessageController($location, $routeParams) {
        var model = this;
        model.deleteMessage=deleteMessage;
        function init() {
            model.userId = $routeParams.uid;
            model.wid = $routeParams.wid;
        }
        init();

        function deleteMessage(){

        }
    }
})();