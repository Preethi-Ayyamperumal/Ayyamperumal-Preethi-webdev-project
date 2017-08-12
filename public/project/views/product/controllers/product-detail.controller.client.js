(function () {
    angular
        .module("GroceryApp")
        .controller("productDetailController", productDetailController);

    function productDetailController($sce,$routeParams,searchService,$location,orderService) {
        var model = this;
        var productId=$routeParams.productId;
        model.trustHtmlContent=trustHtmlContent;
        model.isReviewedByUser=isReviewedByUser;
        model.addtoCart=addtoCart;
        model.date=new Date();
        function init() {
            searchService.loadProduct(productId)
                .then (function (response) {
                        model.product = response;
                        searchService.insertProduct(model.product).then(function(response){
                            console.log(model.product);
                        })
                });
            }
        init();
        function trustHtmlContent(htmlContent) {
            var doc = new DOMParser().parseFromString(htmlContent, "text/html");
            var rval= doc.documentElement.textContent;
            var trustedHTML=$sce.trustAsHtml(rval);
            return trustedHTML;
        }
        function isReviewedByUser()
        {
            return true
        }
        function addtoCart()
        {
                 $location.url("/profile/cart/" + model.product.itemId);

        }

    }
})();