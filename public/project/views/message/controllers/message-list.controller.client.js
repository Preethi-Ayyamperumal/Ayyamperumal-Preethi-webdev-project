(function () {
    angular
        .module("GroceryApp")
        .controller("MessageListController", MessageListController);

    function MessageListController($location,messageService,$route) {
        var model = this;
        model.newMessage=newMessage;
        model.deleteMessage=deleteMessage;
        model.readMessage=readMessage;
        function init() {
           messageService.getSentMessages().then(function(messages){
               model.sentmessages=messages;
               messageService.getReceivedMessages().then(function(messages){
                   model.receivedmessages=messages;
           });
        })}
        init();

        function newMessage(){
            $location.url("profile/newmessage");
        }
        function readMessage(messageID) {
            $location.url("profile/message/"+messageID);
        }
        function deleteMessage(messageID){
            messageService.deleteMessage(messageID).then(function (status){
                $route.reload();
            })
        }

    }
})();