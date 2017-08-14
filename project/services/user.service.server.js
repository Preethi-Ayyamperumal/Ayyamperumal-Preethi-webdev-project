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
app.post('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.get('/api/user', findAllUsers);
app.get('/api/visitor/:username',getVisitorInfo);

app.post('/api/user/add', addUser);
app.get('/api/loggedin', loggedin);
app.put("/api/user", updateUser);
app.put("/api/manage/user/:uid", updateUserAuthorized);
app.delete("/api/user/:uid", deleteUser);
app.get ('/api/following', getFollowing);
app.get ('/api/followers', getFollowers);
app.get ('/api/users/role/:role',getUsersByRole);
app.get ('/api/unfollow/:username', unFollow);
app.put("/api/follow", followUsers);
app.get("/api/tofollow", getUserstoFollow);

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/project/#!/',
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

function getUsersByRole(req, res) {
    var role = req.params.role;

    userModel.getUsersByRole(role)
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
    var user = req.user;
    var userobj=req.body;
    userModel
        .updateUser(userobj)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function updateUserAuthorized(req, res) {
    var userID = req.params.uid;
    var user = req.body;

    userModel
        .updateUserAuthorized(userID,user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}



function deleteUser(req, res) {
    var userID = req.params.uid;

    userModel
        .deleteUser(userID)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function login(req, res) {
    var user = req.user;
    if(user.status === "ACTIVE") {
        res.json(user);
    }else
        res.status(401).json("Blocked User");
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

function getVisitorInfo(req, res) {
    var username = req.params.username;
    if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    var visitorInfo={};
                    visitorInfo.firstName=user._doc.firstName;
                    visitorInfo.lastName=user._doc.lastName;
                    res.json(visitorInfo);
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
                if(bcrypt.compareSync(password, user.password) )
                {
                        return done(null, user);
                }
                else
                {
                    return done(null, false,{ message: 'Incorrect Username or Password.'});
                }
            },
            function(err, user, info) {
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

function addUser (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(
            function(user){
                if(user){
                    res.json(user);
                }
                else
                {
                    console.log("error");
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