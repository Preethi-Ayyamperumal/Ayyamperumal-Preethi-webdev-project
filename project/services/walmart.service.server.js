var q = require('../../q');
const app = require('../../express');
const https = require('https');
var categoryModel = require("../models/category/product_category.model.server");

app.get('/api/product/searchByName/', searchByName);
app.get('/api/product/searchById/:productId', searchById);
app.get('/api/category/update', updateCategories);
app.get('/api/paginated/:categoryID', getPaginatedProducts);

var apiKey;

if(process.env.WALMART_API_KEY)
    apiKey = process.env.WALMART_API_KEY;
else
    apiKey="89gj4x8vxaw93gs9jfdchfpb";

function getPaginatedProducts(req, res) {
    var categoryID   = req.params.categoryID;
    var path='/v1/paginated/items?format=json&category='+categoryID+'&apiKey='+apiKey;
    walmartSearchQuery(path)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}


function updateCategories(req, res) {
    var path='/v1/taxonomy?format=json&apiKey='+apiKey;
    walmartSearchQuery(path)
        .then(function(response){

            categoryModel.updateCategories(response).
                then(function (response) {
                    res.json(response);
            })
        })
}


function searchByName(req, res) {
    var productName   = req.query.productName;
    var start = req.query.start;
    var path='/v1/search?query='+productName+'&format=json&categoryId=976759&apiKey='+apiKey+'&start='+start;
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