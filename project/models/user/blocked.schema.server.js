var mongoose = require("mongoose");
var blockedSchema = mongoose.Schema({
    blockedUsers:[{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    manager: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
}, {collection: "blocked"});
module.exports = blockedSchema;