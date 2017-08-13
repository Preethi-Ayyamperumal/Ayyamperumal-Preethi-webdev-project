(function () {
    angular
        .module("GroceryApp")
        .factory("paymentService", paymentService);
    
    function paymentService($http) {
        var api = {
            "addPayment": addPayment,
            "deletePayment":deletePayment,
             "getAllPayment" :getAllPayment,
            "getPaymentbyID" : getPaymentbyID,
            "updatePayment" : updatePayment
        };
        return api;

        function addPayment(payment) {
            var url = "/api/payment/";
            return $http.post(url,payment)
                .then(function (response) {
                    if(response.hasOwnProperty("data") && response.data.hasOwnProperty("_id"))
                        return true;
                    else
                        return false;
                });
        }

        function deletePayment(paymentId) {
            var url = "/api/payment/"+paymentId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllPayment(){
            var url="/api/payment/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function getPaymentbyID(paymentId){
            var url = "/api/payment/"+paymentId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function updatePayment(paymentId,payment){
            var url = "/api/payment/"+paymentId;
            return $http.put(url,payment)
                .then(function (response){
                    return response.data;
                })
        }
    }
})();