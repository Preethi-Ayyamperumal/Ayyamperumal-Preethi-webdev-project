var mongoose = require("mongoose");
var blockedSchema = mongoose.Schema({
    blockedUsers:[{type: mongoose.Schema.Types.ObjectId, ref:"userModel"}],
    manager: {type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
}, {collection: "blocked"});
module.exports = blockedSchema;