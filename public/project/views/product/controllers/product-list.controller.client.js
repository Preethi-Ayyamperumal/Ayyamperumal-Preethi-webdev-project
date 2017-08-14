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
            model.product.productName=$routeParams.productName;
            model.product.start=1;
            searchProduct();

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
                    model.product.start=response.start;
                    model.numItems=response.numItems;
                    if(parseInt(model.product.start)===1){
                        model.previousState="disabled";
                    }
                    else
                        model.previousState="active";
                    if((parseInt(model.product.start) + parseInt(model.numItems)) > model.totalResults)
                        model.nextState="disabled";
                    else
                        model.nextState="active";
                });
        }

    }
})();