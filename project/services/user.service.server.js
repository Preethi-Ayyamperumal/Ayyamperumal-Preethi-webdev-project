/**
 * Created by preet on 8/10/2017.
 */
var app = require('../../express');
var userModel=require("../models/user/user.model.server");
var passport = require('passport');
var bcrypt = require('../../bcrypt');


var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout', logout);
app.post ('/api/register', register);
app.get ('/api/user', findAllUsers);
app.get ('/api/loggedin', loggedin);
app.put("/api/user", updateUser);

function updateUser(req, res) {
    var user = req.body;

    userModel
        .updateUser(user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}


function findAllUsers(req, res) {
    var username = req.query.username;
    if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}


function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user === null)
                {
                    return done(null, false);
                }
                if(bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }});
                }
            }
        );
}



function serializeUser(user, done) {
    done(null, user);
}




function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
