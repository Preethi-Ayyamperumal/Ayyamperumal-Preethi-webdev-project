(function () {
    angular
        .module("GroceryApp")
        .controller("ProductListController", ProductListController);
    
    function ProductListController($routeParams,searchService,$location) {
        var model = this;

        model.loadProduct=loadProduct;
        model.getPrevious=getPrevious;
        model.getNext=getNext;
        model.searchProduct=searchProduct;
        function init() {
            model.product={};
            model.showNotFound=false;
            if($routeParams.productName){
                model.productname=$routeParams.productName;
                model.product.productName=$routeParams.productName;
                model.product.start=1;
                searchProduct();
            }


            }
        init();

        function loadProduct(productId){
            $location.url("/product/"+productId);

        }

        function getPrevious(){
            model.product.start -=(model.numItems);
            searchProduct();

        }
        function getNext(){
            model.product.start +=(model.numItems);
            searchProduct();
        }

        function searchProduct(){
            searchService.searchProduct(model.product)
                .then (function (response) {
                    model.products = response.items;
                    model.totalResults=response.totalResults;
                    if(model.totalResults <= 0)
                        model.showNotFound=true;
                    model.product.start=response.start;
                    model.numItems=response.numItems;
                    if(parseInt(model.product.start)===1){
                        model.previousState="disabled";
                    }
                    else
                        model.previousState="active";
                    if(model.totalResults < model.product.start)
                        model.nextState="disabled";
                    else
                        model.nextState="active";
                });
        }

    }
})();