var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"), 
    User       = require("./models/user"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");


var indexRoutes      = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments");
    


app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
//passport routes
app.use(require("express-session")({
    secret: "we can wright anything we want here",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//mongoose.connect("mongodb://localhost:27017/yelp_campV8", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://sebauru87:filosofia@yelpcamp-ijcji.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error     = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


//seedDB();

// Campground.create({
//     name: "Playa Divina",
//     image: "https://assets.simpleviewinc.com/simpleview/image/fetch/c_pad,h_370,q_70,w_560/https://assets.simpleviewinc.com/simpleview/image/upload/crm/flaglercountyfl/0098540-2003-Jan-Flaglerbythesea-site-view_812b0d51-5056-a36a-065d47c2cb89e3ad.jpg",
//     description: "La mejor playa con vista al mar y placeres"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Agregaste un nuevo camp!");
//         console.log(campground);
//     }
// });

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.get("*", function (req, res) {  
    res.send("Le erraste de pagina");
});
app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
    console.log("Server has starter");
});