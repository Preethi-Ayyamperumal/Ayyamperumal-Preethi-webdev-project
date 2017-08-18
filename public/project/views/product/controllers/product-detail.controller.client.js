(function () {
    angular
        .module("GroceryApp")
        .controller("productDetailController", productDetailController);

    function productDetailController($sce,$routeParams,searchService,$location,reviewService,CurrentUser) {
        var model = this;
        var productId=$routeParams.productId;
        model.trustHtmlContent=trustHtmlContent;
        model.addtoCart=addtoCart;
        model.addtoWishList=addtoWishList;
        model.addReview=addReview;
        model.loadProduct=loadProduct;
        function init() {
            model.date=new Date();
            model.CurrentUser=CurrentUser;
            model.enableReviewLink=true;
            searchService.loadProduct(productId)
                .then (function (response) {
                        model.product = response;
                        if(!response.availableOnline)
                            model.product.salePrice="20.76";
                        searchService.insertProduct(model.product).then(function(response){
                                reviewService.getReviewbyProduct(model.product.itemId).then(function (reviews){
                                    model.reviews=reviews;
                                    if(model.CurrentUser){
                                        for(review in model.reviews){
                                               if(model.reviews[review].reviewed_by === model.CurrentUser._id)
                                                   model.enableReviewLink=false;
                                        }
                                    }

                                })
                        })
                });
            }
        init();
function loadProduct() {
    window.history.back();
}
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