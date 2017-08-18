(function () {
    angular
        .module("GroceryApp")
        .controller("AdminController", AdminController);
    
    function AdminController(categoryService,CurrentUser) {
        var model = this;
        model.updateCategories=updateCategories;
        function init() {
            model.currentUser=CurrentUser;
            model.isUpdated=false;
        }

        init();
        function updateCategories(){
            categoryService.updateCategories()
                .then (function (response) {
                   model.isUpdated=true;
                });
        }
    }})();