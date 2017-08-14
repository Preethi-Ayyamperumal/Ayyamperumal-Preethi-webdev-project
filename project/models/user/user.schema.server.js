var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    role: {type: String, default:'CUSTOMER' ,enum:["ADMIN", "CUSTOMER", "MANAGER"]},
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
    status:{type: String, default:'ACTIVE' ,enum:["ACTIVE", "BLOCKED"]},
    dateCreated:{type: Date, default: Date.now}
}, {collection: "user"});
module.exports = userSchema;