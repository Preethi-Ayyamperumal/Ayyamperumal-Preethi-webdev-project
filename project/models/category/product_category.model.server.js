var mongoose = require("mongoose");
var productCategorySchema = require("./product_category.schema.server");
var productCategoryModel = mongoose.model("productCategoryModel", productCategorySchema);
//var websiteModel = require("../website/website.model.server");
productCategoryModel.getAllCategories = getAllCategories;
productCategoryModel.updateCategories=updateCategories;

module.exports = productCategoryModel;

function getAllCategories() {
    return productCategoryModel.find({});
}

function updateCategories(response) {

    return productCategoryModel.count()
        .then(function (count) {
        {
            if(count>0)
            {
                return productCategoryModel.remove({})
                    .then(function (status) {
                    return insertFoodCategory(response);
                })
            }
            else
                return insertFoodCategory(response);

        }
    });
}

function insertFoodCategory(response)
{
    var foodcategory ;
    var numitems = response.categories.length;
    for(var i = 0 ; i < numitems; i++)
    {
        if (response.categories[i].name==="Food")
            foodcategory=response.categories[i].children;
    }
    return productCategoryModel.collection.insert(foodcategory);

}


