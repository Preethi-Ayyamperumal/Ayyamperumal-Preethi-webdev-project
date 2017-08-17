(function () {
    angular
        .module("GroceryApp")
        .controller("ProductAddController", ProductAddController);

    function ProductAddController($location, $route,categoryService,paginatedService,searchService) {
        var model = this;
        model.setSubCategory=setSubCategory;
        model.setSelected=setSelected;
        model.addProduct=addProduct;
        model.loadProduct=loadProduct;
        function init() {
            categoryService.getCategories()
                .then (function (response) {
                    model.categories = response;
                    model.subcategory_selected=false;
                });
        }
        init();

        function setSubCategory(category) {
            model.categoryName = category.name;

            if (category.children.length > 0)
             model.subCategory = category.children;
            else
            {
                model.subCategory=[];
                model.dbProducts=[];
                paginatedService.getProducts(category.id)
                    .then(function (response) {
                        model.products=response;
                        searchService.getAllProducts()
                            .then(function (products) {
                                model.dbProducts = products;
                            });
                        model.products = model.products.filter((function(product){
                            return model.dbProducts
                                .filter(function (dbproduct) {
                                       return dbproduct.itemId != product.itemId;
                            })
                            }));
                        model.subcategory_selected=true;

                    });
            }
        }

        function setSelected(categoryID) {
            model.dbProducts=[];
            paginatedService.getProducts(categoryID)
                .then(function (response) {
                    model.products=response;
                    searchService.getAllProducts()
                        .then(function (products) {
                            model.dbProducts = products;
                            model.products = model.products.filter(checkDB,model.dbProducts);
                            model.subcategory_selected=true;
                            document.body.scrollTop = document.documentElement.scrollTop = 0;

                        });

                });
        }
        function addProduct(product)
        {
            searchService.insertProduct(product).then(function(response)
            {
                var index=model.products.indexOf(product);
                model.products.splice(index,1);
            })


        }

        function checkDB(product) {
            var index = this.findIndex(function (dbproduct) {
                return (dbproduct.itemId === product.itemId);
            })
            return (index === -1);

        }

        function searchWalmart()
        {
            $location.url("/product/add");
        }

        function loadProduct(productID) {
            $location.url("/product/"+productID);
        }

    }
})();