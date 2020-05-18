var express = require("express");
var router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get("/", function (req, res) { 
    res.render("home");
});




//Auth routes
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        
        if(err){
            //console.log(err.message);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Siged Up. Welcome to YelpCamp:" + " " + user.username);
            res.redirect("/campgrounds");
        });
        
    });
});

router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "You have Successfully logged Out");
    res.redirect("/");
});


module.exports = router;