(function () {
    angular
        .module("GroceryApp")
        .controller("MessageListController", MessageListController);

    function MessageListController($location,messageService) {
        var model = this;
        model.editMessage=editMessage;
        model.newMessage=newMessage;
        function init() {
           messageService.getMessages().then(function(messages){
               model.messages=messages;
           });
        }
        function editMessage(){
            $location.url("profile/"+model.userId+"/message/"+ model.mId);
        }
        function newMessage(){
            $location.url("profile/"+model.userId+"/message/new");
        }
        init();

    }
})();