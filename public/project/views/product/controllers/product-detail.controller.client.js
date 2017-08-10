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
                    model.cartItems=0;

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
                 orderService.addtoCart(model.product.itemId)
                     .then(function (status) {
                            if(status)
                                model.cartItems+=1;
                     })
        }

    }
})();