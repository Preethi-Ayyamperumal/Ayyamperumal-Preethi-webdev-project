(function () {
    angular
        .module("GroceryApp")
        .controller("MessageListController", MessageListController);

    function MessageListController($location, $routeParams) {
        var model = this;
        model.editMessage=editMessage;
        model.newMessage=newMessage;
        function init() {
            model.userId = 123;
            model.mId=123;
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