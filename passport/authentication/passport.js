const passport = require("passport"); // main passport extension
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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

passport.use(
    new GoogleStrategy(
        {
            clientID:
                "699933352506-ev09nokpnu073c1qp1e5le0t2g4bftut.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:4444/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        username: profile.displayName,
                        googleImg: profile.picture,
                        googleAccessToken: accessToken,
                    });
                }
                return done(null, user);
            } catch (err) {
                done(err);
            }
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
        }
    )
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
