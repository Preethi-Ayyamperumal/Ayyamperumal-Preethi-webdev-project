(function () {
    angular
        .module("GroceryApp")
        .factory("messageService", messageService);
    
    function messageService($http) {
        var api = {
            "sendMessage": sendMessage,
            "deleteMessage":deleteMessage,
             "getMessages" :getMessages,
            "getMessage":getMessage,
            "getSentMessages":getSentMessages,
            "getReceivedMessages":getReceivedMessages,
            "sendMessageToManagers":sendMessageToManagers

        };
        return api;

        function sendMessage(message) {
            var url = "/api/message/";
            return $http.post(url,message)
                .then(function (response) {
                    if(response.hasOwnProperty("data") && response.data.hasOwnProperty("_id"))
                        return true;
                    else
                        return false;
                });
        }

        function sendMessageToManagers(message) {
            var url = "/api/messagetomanagers/";
            return $http.post(url,message)
                .then(function (response) {
                    if(response.hasOwnProperty("data"))
                        return true;
                    else
                        return false;
                });
        }

        function deleteMessage(messageID) {
            var url = "/api/message/"+messageID;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getMessages(){
            var url="/api/message/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function getMessage(messageID){
            var url="/api/message/"+messageID;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function getSentMessages(){
            var url="/api/sentmessage/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function getReceivedMessages(){
            var url="/api/receivedmessage/";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }
    }
})();