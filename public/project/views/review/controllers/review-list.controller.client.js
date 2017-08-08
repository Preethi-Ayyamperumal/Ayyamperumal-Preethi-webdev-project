(function () {
    angular
        .module("GroceryApp")
        .controller("ReviewListController", ReviewListController);

    function ReviewListController($location, $routeParams) {
        var model = this;
        model.editMessage=editMessage;
        model.newMessage=newMessage;
        model.isReviewEmpty=isReviewEmpty;
        function init() {
            model.userId = 123;
            model.mId=123;
            model.ratingValue=4;
        }
        function editMessage(){
            $location.url("profile/"+model.userId+"/message/"+ model.mId);
        }
        function newMessage(){
            $location.url("profile/"+model.userId+"/message/new");
        }

        function isReviewEmpty(){
            return false;
        }
        init();

    }
})();