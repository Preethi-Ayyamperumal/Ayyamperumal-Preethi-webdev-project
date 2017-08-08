(function () {
    angular
        .module("GroceryApp")
        .controller("productDetailController", productDetailController);

    function productDetailController($sce,$routeParams,searchService,$location) {
        var model = this;
        var productId=$routeParams.productId;
        model.trustHtmlContent=trustHtmlContent;
        model.isReviewedByUser=isReviewedByUser;
        model.date=new Date();
        function init() {
            searchService.loadProduct(productId)
                .then (function (response) {
                        model.product = response.data;


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

    }
})();