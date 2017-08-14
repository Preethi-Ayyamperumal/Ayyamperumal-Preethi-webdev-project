(function () {
    angular
        .module("GroceryApp")
        .controller("NewMessageController", NewMessageController);

    function NewMessageController($location, messageService) {
        var model = this;
        model.sendMessage=sendMessage;
        model.discardDraft=discardDraft;
        function init() {
        }

        init();

        function sendMessage(){
            messageService.sendMessageToManagers(model.message).then(function (status) {
                $location.url("/profile/message/");
            })
        }
        function discardDraft(){
            $location.url("/profile/message/");
        }

    }
})();