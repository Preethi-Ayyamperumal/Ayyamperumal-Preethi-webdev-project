var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
if(process.env.MLAB_PASSWORD_WEBDEV)
{
    app.use(session({ secret: process.env.SESSION_SECRET }));
}
else
{
    app.use(session({secret: "Testefwfds"}));
}
app.use(passport.initialize());
app.use(passport.session());

require("./project/app");
port = process.env.PORT || 3001;
app.listen(port);