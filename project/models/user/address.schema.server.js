var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    role: {type: String, enum:["ADMIN", "CUSTOMER", "MANAGER"]},
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email:String,
    phone:String,
    dob:Date,
    followers:[ this ],
    following:[ this ],
    websites:[{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],
    dateCreated:{type: Date, default: Date.now}
}, {collection: "user"});
module.exports = userSchema;