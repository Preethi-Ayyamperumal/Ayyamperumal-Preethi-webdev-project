var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    role: {type: String, enum:["ADMIN", "CUSTOMER", "MANAGER"]},
    username: String,
    password: String,
    facebook: {
        id:    String,
        token: String
    },
    firstName: String,
    lastName: String,
    email:String,
    phone:String,
    dob:Date,
    following:[ this ],
    isBlocked:Boolean,
    dateCreated:{type: Date, default: Date.now}
}, {collection: "user"});
module.exports = userSchema;