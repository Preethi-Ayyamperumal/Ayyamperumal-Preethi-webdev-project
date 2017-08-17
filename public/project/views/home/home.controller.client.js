(function () {
    angular
        .module("GroceryApp")
        .controller("homeController", homeController);
    
    function homeController(categoryService,$location,paginatedService,CurrentUser,UserService,searchService) {
        var model = this;
        model.updateCategories=updateCategories;
        model.setSelected=setSelected;
        model.setSubCategory=setSubCategory;
        model.loadProduct=loadProduct;
        model.logout=logout;
        model.setSubset=setSubset;
        model.currentState=currentState;
        function init() {
            model.currentUser = CurrentUser;
            model.itemsPerPage = 20;
            model.categoryName;
            model.initial_load=true;
            model.currentSubcategory="Choose/Change Categories";
            categoryService.getCategories()
                .then(function (response) {
                    model.categories = response;
                    model.subcategory_selected = true;
                    setSubCategory(model.categories[0]);
                    setSelected(model.categories[0].children[0]);
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
               var current_start=parseInt(index*model.itemsPerPage);
               var current_end=current_start+model.itemsPerPage;
               if(current_end > model.totalproducts )
                   current_end=model.totalproducts;
                model.productSubset = model.products.slice(current_start, current_end);
                document.body.scrollTop = document.documentElement.scrollTop = 0;

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
            model.categoryName=category.name;
            model.currentSubcategory="Choose/Change Categories";
            if(category.children.length >0 )
            {
                model.subCategory=category.children;
                setSelected(category.children[0]);
            }
            else
            {
                model.subCategory=[];
                paginatedService.getProducts(category.id)
                    .then(function (response) {
                        model.products=response;
                        model.totalproducts=model.products.length;
                        model.pagination= new Array(model.totalproducts/model.itemsPerPage);
                        setSubset(0);
                    });
            }
        }


        function setSelected(category) {
            model.initial_load=false;
            model.currentSubcategory=category.name;
            paginatedService.getProducts(category.id)
                .then(function (response) {
                    model.products=response;
                    model.totalproducts=model.products.length;
                    model.pagination= new Array(model.totalproducts/model.itemsPerPage);
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


    }
})();