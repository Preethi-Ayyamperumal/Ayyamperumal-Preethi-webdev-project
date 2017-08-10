const app = require('../../express');
var categoryModel = require("../models/category/product_category.model.server");

app.get('/api/category/', getCategories);

var apiKey;

if(process.env.WALMART_API_KEY)
    apiKey = process.env.WALMART_API_KEY;
else
    apiKey="89gj4x8vxaw93gs9jfdchfpb";



function getCategories(req, res) {
     categoryModel.getAllCategories().then(function (response) {
         res.json(response);

     })
}

