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
                resolve: { loggedInUser: checkLoggedin }
            })
            .when("/profile/address", {
                templateUrl: "views/shipping/templates/address-list.view.client.html",
                controller: "AddressListController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/address/new", {
                templateUrl: "views/shipping/templates/address-new.view.client.html",
                controller: "AddressNewController",
                controllerAs: "model"
            })
            .when("/profile/address/:aid/", {
                templateUrl: "views/shipping/templates/address-edit.view.client.html",
                controller: "AddressEditController",
                controllerAs: "model"
            })

            .when("/profile/payment/", {
                templateUrl: "views/payment/templates/payment-list.view.client.html",
                controller: "PaymentListController",
                controllerAs: "model"
            })
            .when("/profile/payment/new", {
                templateUrl: "views/payment/templates/payment-new.view.client.html",
                controller: "PaymentNewController",
                controllerAs: "model"
            })
            .when("/profile/payment/:payid/", {
                templateUrl: "views/payment/templates/payment-edit.view.client.html",
                controller: "PaymentEditController",
                controllerAs: "model"
            })
            .when("/profile/followers/", {
                templateUrl: "views/lists/templates/followers-list.view.client.html",
                controller: "FollowersController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/following/", {
                templateUrl: "views/lists/templates/follow-list.view.client.html",
                controller: "FollowingController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/wishlist/", {
                templateUrl: "views/lists/templates/wish-list.view.client.html",
                controller: "WishListViewController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/product/:pid/wishlist/new/", {
                templateUrl: "views/lists/templates/wishlist-new.view.client.html",
                controller: "WishListNewController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/users/", {
                templateUrl: "views/lists/templates/user-list.view.client.html",
                controller: "UserListController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
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
            .when("/profile/cart/:iID", {
                templateUrl: "views/order/templates/cart.view.client.html",
                controller: "CartViewController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/:uid/checkout", {
            templateUrl: "views/order/templates/checkout.view.client.html",
            controller: "CheckoutController",
            controllerAs: "model"
            })
            .when("/profile/message", {
                templateUrl: "views/message/templates/message-list.view.client.html",
                controller: "MessageListController",
                controllerAs: "model"
            })
            .when("/profile/message/new", {
                templateUrl: "views/message/templates/message-new.view.client.html",
                controller: "NewMessageController",
                controllerAs: "model"
            })
            .when("/profile/message/:mId", {
                templateUrl: "views/message/templates/message-edit.view.client.html",
                controller: "EditMessageController",
                controllerAs: "model"
            })
            .when("/profile/review", {
                templateUrl: "views/review/templates/review-list.view.client.html",
                controller: "ReviewListController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/product/:pid/review/new", {
                templateUrl: "views/review/templates/review-new.view.client.html",
                controller: "NewReviewController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/review/:rid", {
                templateUrl: "views/review/templates/review-edit.view.client.html",
                controller: "EditReviewController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
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

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope,UserService) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .then(function (user) {
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
        return deferred.promise;
    };
})();