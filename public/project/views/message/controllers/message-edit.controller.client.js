(function () {
    angular
        .module("GroceryApp")
        .controller("EditMessageController", EditMessageController);

    function EditMessageController($location, $routeParams,messageService,CurrentUser) {
        var model = this;
        model.deleteMessage=deleteMessage;
        model.sendReply=sendReply;
        model.setUserReplying=setUserReplying;

        function init() {
            model.reply={}
            model.CurrentUser=CurrentUser;
            model.isUserReplying=false;
            model.messageID = $routeParams.mId;
            messageService.getMessage(model.messageID).then(function (message) {
                model.message=message;
                if(model.message.From._id === model.CurrentUser._id)
                    model.enableReply=false;
                else
                    model.enableReply=true;
            })
        }
        init();

        function deleteMessage(){
            messageService.deleteMessage(model.messageID).then(function (status){
                $location.url("/profile/message");
            })
        }
        function setUserReplying(){
            model.reply.From=model.message.To;
            model.reply.To=model.message.From;
            model.reply.message_date=new Date();
            model.reply.category=model.message.category;
            model.isUserReplying=true;
        }
        function sendReply(){

            messageService.sendMessage(model.reply).then(function (status){
                $location.url("/profile/message");
            })


        }


    }
})();