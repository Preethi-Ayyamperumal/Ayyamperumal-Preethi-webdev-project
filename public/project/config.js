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
                controllerAs: "model",
                resolve: {CurrentUser:getCurrentUser}
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
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/address/:aid/", {
                templateUrl: "views/shipping/templates/address-edit.view.client.html",
                controller: "AddressEditController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })

            .when("/profile/payment/", {
                templateUrl: "views/payment/templates/payment-list.view.client.html",
                controller: "PaymentListController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/payment/new", {
                templateUrl: "views/payment/templates/payment-new.view.client.html",
                controller: "PaymentNewController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/payment/:payid/", {
                templateUrl: "views/payment/templates/payment-edit.view.client.html",
                controller: "PaymentEditController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
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
            .when("/profile/visitor/:vid", {
                templateUrl: "views/user/templates/profile-visitor.view.client.html",
                controller: "VisitorProfileController",
                controllerAs: "model"
            })
            .when("/profile/cart/:iID", {
                templateUrl: "views/order/templates/cart-add.view.client.html",
                controller: "CartAddController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/cart", {
                templateUrl: "views/order/templates/cart.view.client.html",
                controller: "CartViewController",
                controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/checkout", {
            templateUrl: "views/order/templates/checkout.view.client.html",
            controller: "CheckoutController",
            controllerAs: "model",
                resolve: {
                    loggedInUser: checkLoggedin
                }
            })
            .when("/profile/message", {
                templateUrl: "views/message/templates/message-list.view.client.html",
                controller: "MessageListController",
                controllerAs: "model",
                resolve: {CurrentUser:checkLoggedin}

            })

            .when("/profile/message/:mId", {
                templateUrl: "views/message/templates/message-edit.view.client.html",
                controller: "EditMessageController",
                controllerAs: "model",
                resolve: {CurrentUser:checkLoggedin}

            })
            .when("/profile/newmessage/", {
                templateUrl: "views/message/templates/message-new.view.client.html",
                controller: "NewMessageController",
                controllerAs: "model",
                resolve: {CurrentUser:checkLoggedin}

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
            .when("/search", {
                templateUrl: "views/product/templates/product-list.view.client.html",
                controller: "ProductListController",
                controllerAs: "model"
            })
            .when("/product/:productId", {
                templateUrl: "views/product/templates/product-detail.view.client.html",
                controller: "productDetailController",
                controllerAs: "model",
                resolve: {CurrentUser:getCurrentUser}

            })
            .when("/category/update", {
                templateUrl: "views/category/templates/category-edit.view.client.html",
                controller: "CategoryEditController",
                controllerAs: "model"
            })
            .when("/admin", {
            templateUrl: "views/admin/templates/admin.view.client.html",
            controller: "AdminController",
            controllerAs: "model",
            resolve:
                { CurrentUser: getCurrentUser }
            })
            .when("/manager", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve:
                    { CurrentUser: getCurrentUser }
            })
            .when("/customers", {
            templateUrl: "views/database/templates/customer.view.client.html",
            controller: "CustomerController",
            controllerAs: "model",
            resolve:
                { loggedInUser: checkLoggedin }
            })
            .when("/managers", {
                templateUrl: "views/database/templates/manager.view.client.html",
                controller: "ManagerController",
                controllerAs: "model",
                resolve:
                    { loggedInUser: checkLoggedin }
            })
            .when("/products", {
                templateUrl: "views/database/templates/product.view.client.html",
                controller: "ProductController",
                controllerAs: "model",
                resolve:
                    { loggedInUser: checkLoggedin }
            })
            .when("/products/add", {
                templateUrl: "views/database/templates/product-add.view.client.html",
                controller: "ProductAddController",
                controllerAs: "model",
                resolve:
                    { loggedInUser: checkLoggedin }
            })
            .when("/orders", {
                templateUrl: "views/database/templates/orders.view.client.html",
                controller: "OrderController",
                controllerAs: "model",
                resolve:
                    { loggedInUser: checkLoggedin }
            })
            .when("/profile/order", {
                templateUrl: "views/order/templates/order-summary.view.client.html",
                controller: "OrderListController",
                controllerAs: "model",
                resolve:
                    { loggedInUser: checkLoggedin }
            })
            .when("/profile/order/:oid", {
                templateUrl: "views/order/templates/order.view.client.html",
                controller: "OrderViewController",
                controllerAs: "model",
                resolve:
                    { loggedInUser: checkLoggedin }
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
    var getCurrentUser = function($q, $timeout, $http, $location, $rootScope,UserService) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .then(function (user) {
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.resolve(null);
                }
            });
        return deferred.promise;
    };
})();