var moongose = require("mongoose");
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new moongose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = moongose.model("User", UserSchema);
