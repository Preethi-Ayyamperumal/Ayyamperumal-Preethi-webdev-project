(function () {
    angular
        .module("GroceryApp")
        .controller("productDetailController", productDetailController);

    function productDetailController($sce,$routeParams,searchService,$location,reviewService) {
        var model = this;
        var productId=$routeParams.productId;
        model.trustHtmlContent=trustHtmlContent;
        model.addtoCart=addtoCart;
        model.addtoWishList=addtoWishList;
        model.addReview=addReview;
        model.date=new Date();
        function init() {
            searchService.loadProduct(productId)
                .then (function (response) {
                        model.product = response;
                        searchService.insertProduct(model.product).then(function(response){
                                reviewService.getReviewbyProduct(model.product.itemId).then(function (reviews){
                                    model.reviews=reviews;
                                })
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

        function addtoCart()
        {
                 $location.url("/profile/cart/" + model.product.itemId);

        }

        function addReview()
        {
            $location.url("/profile/product/"+model.product.itemId+"/review/new");

        }

        function addtoWishList()
        {
            $location.url("/profile/product/"+model.product.itemId+"/wishlist/new/");
        }

    }
})();