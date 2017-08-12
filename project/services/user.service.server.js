/**
 * Created by preet on 8/10/2017.
 */
var app = require('../../express');
var userModel=require("../models/user/user.model.server");
var passport = require('passport');
var bcrypt = require('../../bCrypt');

var facebookConfig = {
    clientID     : "298691627269838",
    clientSecret : "1c66d58197050af1002a6363722052bf",
    callbackURL  : "http://shop-groceries-online.herokuapp.com/auth/facebook/callback"
};

var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout', logout);
app.post ('/api/register', register);
app.get ('/api/user', findAllUsers);
app.get ('/api/loggedin', loggedin);
app.put("/api/user", updateUser);
app.get ('/api/following', getFollowing);
app.get ('/api/followers', getFollowers);

app.get ('/api/unfollow/:username', unFollow);
app.put("/api/follow", followUsers);
app.get("/api/tofollow", getUserstoFollow);

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login' }));

function getFollowing(req, res) {
    var user = req.user;
    userModel.getFollowing(user._id)
        .then(function (users){
            res.json(users)
        });
}
function getFollowers(req, res) {
    var user = req.user;
    userModel.getFollowers(user.username)
        .then(function (users){
            res.json(users)
        });
}

function getUserstoFollow(req, res) {
    var user = req.user;
    userModel.getUserstoFollow(user)
        .then(function (users){
            //console.log(user.username,users);
            res.json(users)
        });
}


function unFollow(req, res) {
    var user = req.user;
    var usertoberemoved = req.params.username;
    userModel.unFollowUser(user,usertoberemoved)
        .then(function (status){
            res.json(status)
        });
}


function followUsers(req, res) {
    var user = req.user;
    var usersToFollow = req.body;
    userModel.addFollowers(user,usersToFollow)
        .then(function (status){
            res.json(status)
        });
}


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

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
    function(user) {
        if(user === null)
        {
            user={
                username:profile.displayName.replace(/ /g,''),
                facebook:{
                    token:token,
                    id:profile.id
                }
            };
            userModel.createUser(user)
                .then(function(user){
                    done(null,user);
                })
        }
        else
            return done(null, user);
    },
    function(err) {
        if (err) { return done(err); }
    });
}