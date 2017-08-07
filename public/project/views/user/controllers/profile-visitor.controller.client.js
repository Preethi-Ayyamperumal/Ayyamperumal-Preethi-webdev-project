(function () {

    angular
        .module("GroceryApp")
        .controller("VisitorProfileController", VisitorProfileController)

    function VisitorProfileController($location, $routeParams) {
        var model = this;
        model.toggle=toggle;
        function init() {
            model.userId=123;
            model.addressId=123;
            model.paymentId=123;
            model.followStatus="Follow";
        }

        init();


       function toggle() {
           if(model.followStatus === "Follow")
               model.followStatus="UnFollow";
           else
               model.followStatus="Follow";
       }

    }

})();