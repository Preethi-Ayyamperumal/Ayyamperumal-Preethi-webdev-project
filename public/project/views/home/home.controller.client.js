(function () {
    angular
        .module("GroceryApp")
        .controller("homeController", homeController);
    
    function homeController(categoryService,$location,paginatedService,CurrentUser,UserService) {
        var model = this;
        model.updateCategories=updateCategories;
        model.setSelected=setSelected;
        model.setSubCategory=setSubCategory;
         model.loadProduct=loadProduct;
         model.logout=logout;

        function init() {
            model.currentUser=CurrentUser;
            categoryService.getCategories()
                .then (function (response) {
                    model.categories = response;
                    model.subcategory_selected=false;
                });
        }
        init();

        function updateCategories(){
            categoryService.updateCategories()
                .then (function (response) {
                    location.reload()
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    });
        }

        function setSubCategory(category){
            if(category.children.length >0 )
                model.subCategory=category.children;
            else
            {
                model.subCategory=[];
                paginatedService.getProducts(category.id)
                    .then(function (response) {
                        model.products=response;
                        model.subcategory_selected=true;
                    });
            }
        }


        function setSelected(categoryID) {
            paginatedService.getProducts(categoryID)
                .then(function (response) {
                    model.products=response;
                    model.subcategory_selected=true;
                });
        }

        function loadProduct(productId){
            $location.url("/product/"+productId);

        }
    }
})();