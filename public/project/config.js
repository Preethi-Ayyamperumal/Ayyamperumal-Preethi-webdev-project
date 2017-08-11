(function () {

    angular
        .module("GroceryApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider,$qProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
        $qProvider.errorOnUnhandledRejections(false);
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"

            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/profile/:uid/address/", {
                templateUrl: "views/shipping/templates/address-list.view.client.html",
                controller: "AddressListController",
                controllerAs: "model"
            })
            .when("/profile/:uid/address/:aid", {
                templateUrl: "views/shipping/templates/address-edit.view.client.html",
                controller: "AddressEditController",
                controllerAs: "model"
            })
            .when("/profile/:uid/payment/:payId", {
                templateUrl: "views/payment/templates/payment-edit.view.client.html",
                controller: "PaymentEditController",
                controllerAs: "model"
            })
            .when("/profile/:uid/followers/", {
                templateUrl: "views/lists/templates/followers-list.view.client.html",
                controller: "FollowersController",
                controllerAs: "model"
            })
            .when("/profile/:uid/following/", {
                templateUrl: "views/lists/templates/follow-list.view.client.html",
                controller: "FollowingController",
                controllerAs: "model"
            })
            .when("/profile/:uid/visitor/:vid", {
                templateUrl: "views/user/templates/profile-visitor.view.client.html",
                controller: "VisitorProfileController",
                controllerAs: "model"
            })
            .when("/profile/:uid/orders", {
                templateUrl: "views/order/templates/order-summary.view.client.html",
                controller: "OrdersViewController",
                controllerAs: "model"
            })
            .when("/profile/:uid/cart", {
                templateUrl: "views/order/templates/cart.view.client.html",
                controller: "CartViewController",
                controllerAs: "model"
            })
            .when("/profile/:uid/checkout", {
            templateUrl: "views/order/templates/checkout.view.client.html",
            controller: "CheckoutController",
            controllerAs: "model"
            })
            .when("/profile/:uid/message", {
                templateUrl: "views/message/templates/message-list.view.client.html",
                controller: "MessageListController",
                controllerAs: "model"
            })
            .when("/profile/:uid/message/new", {
                templateUrl: "views/message/templates/message-new.view.client.html",
                controller: "NewMessageController",
                controllerAs: "model"
            })
            .when("/profile/:uid/message/:mId", {
                templateUrl: "views/message/templates/message-edit.view.client.html",
                controller: "EditMessageController",
                controllerAs: "model"
            })
            .when("/profile/:uid/review", {
                templateUrl: "views/review/templates/review-list.view.client.html",
                controller: "ReviewListController",
                controllerAs: "model"
            })
            .when("/profile/:uid/product/:pid/review/new", {
                templateUrl: "views/review/templates/review-new.view.client.html",
                controller: "NewReviewController",
                controllerAs: "model"
            })
            .when("/profile/:uid/product/:pid/review", {
                templateUrl: "views/review/templates/review-edit.view.client.html",
                controller: "EditReviewController",
                controllerAs: "model"
            })
            .when("/search/:productName", {
                templateUrl: "views/product/templates/product-list.view.client.html",
                controller: "ProductListController",
                 controllerAs: "model"
             })
            .when("/product/:productId", {
                templateUrl: "views/product/templates/product-detail.view.client.html",
                controller: "productDetailController",
                controllerAs: "model"
            })
            .when("/category/update", {
                templateUrl: "views/category/templates/category-edit.view.client.html",
                controller: "CategoryEditController",
                controllerAs: "model"
            })

    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin')
            .then(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
        });
        return deferred.promise;
    };
})();