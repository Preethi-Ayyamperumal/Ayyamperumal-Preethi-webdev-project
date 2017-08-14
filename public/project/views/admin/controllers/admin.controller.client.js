(function () {
    angular
        .module("GroceryApp")
        .controller("AdminController", AdminController);
    
    function AdminController(categoryService,$location,paginatedService,CurrentUser) {
        var model = this;
        function init() {
            model.currentUser=CurrentUser;
        }

        init();
    }})();