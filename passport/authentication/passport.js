const passport = require("passport"); // main passport extension
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// configuring or setting up of a strategy
passport.use(
    new LocalStrategy(async function (username, password, done) {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (!result)
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                else
                    return done(null, user, {
                        message: `Welcome ${username}`,
                    });
            });
        } catch (err) {
            done(err);
        }
    })
);

// passport setup
passport.serializeUser(function (user, done) {
    done(null, user._id); // store the user's id
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
