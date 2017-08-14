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
        model.getPagination=getPagination;
        model.setSubset=setSubset;
        model.currentState=currentState;
        function init() {
            model.currentUser=CurrentUser;

            categoryService.getCategories()
                .then (function (response) {
                    model.categories = response;
                    model.subcategory_selected=true;

                });
        }
        init();

        function updateCategories(){
            categoryService.updateCategories()
                .then (function (response) {
                    location.reload()
                });
        }
            function setSubset(index){
               var current_start=parseInt(index*10);
               var current_end=current_start+10;
               if(current_end > model.totalproducts )
                   current_end=model.totalproducts;
                model.productSubset = model.products.slice(current_start, current_end);
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
            {
                model.subCategory=category.children;
            }
            else
            {
                model.subCategory=[];
                paginatedService.getProducts(category.id)
                    .then(function (response) {
                        model.products=response;
                        model.totalproducts=model.products.length;
                        model.pagination= new Array(model.totalproducts/10);
                    });
            }
        }


        function setSelected(categoryID) {
            paginatedService.getProducts(categoryID)
                .then(function (response) {
                    model.products=response;
                    model.totalproducts=model.products.length;
                    model.pagination= new Array(model.totalproducts/10);
                    setSubset(0);
                });
        }

        function currentState(current_index,my_index) {
            if(current_index===my_index){
                return "active";
            }else
                return "";
        }
        function loadProduct(productId){
            $location.url("/product/"+productId);

        }

        function getPagination(){
            var pagination=parseInt(model.products.length/10);
            var arr = new Array(pagination);
            return arr;
        }

    }
})();