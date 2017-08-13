(function () {
    angular
        .module("GroceryApp")
        .controller("NewMessageController", NewMessageController);

    function NewMessageController($location, $routeParams) {
        var model = this;
        model.sendMessage=sendMessage;
        model.discardDraft=discardDraft;
        function init() {
            model.userId = $routeParams.uid;
        }

        init();

        function sendMessage(message){

        }
        function discardDraft(){

        }

    }
})();