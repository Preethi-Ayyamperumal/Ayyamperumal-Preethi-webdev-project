var q = require('../q');
const app = require('../express');
const https = require('https');

app.get('/api/product/searchByName/:productName', searchByName);
app.get('/api/product/searchById/:productId', searchById);

var apiKey;

if(process.env.WALMART_API_KEY)
    apiKey = process.env.WALMART_API_KEY;
else
    apiKey="89gj4x8vxaw93gs9jfdchfpb";



function searchByName(req, res) {
    var productName   = req.params.productName;
    var path='/v1/search?query=+'+productName+'&format=json&apiKey='+apiKey;
    walmartSearchQuery(path)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function searchById(req, res) {
    var productId   = req.params.productId;
    var path='/v1/items/'+productId+'?format=json&apiKey='+apiKey;
    walmartSearchQuery(path)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function walmartSearchQuery(path) {
    var deferred = q.defer();
    https.get({
        host: 'api.walmartlabs.com',
        path: path,
        headers: {
            "Accept": "application/json"
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}