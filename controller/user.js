const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.getHome = async (req, res, next) => {
    try {
        res.render("index", { title: "Home" });
    } catch (err) {
        next(err);
    }
};

module.exports.getLogin = async (req, res, next) => {
    try {
        res.render("login");
    } catch (err) {
        next(err);
    }
};

module.exports.getSignUp = async (req, res, next) => {
    try {
        res.render("signUp");
    } catch (err) {
        next(err);
    }
};

module.exports.postSignUp = async (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.redirect("/profile");
    }
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.render("signUp", { msg: "User already exists" });
        }
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return next(err);
            }
            user = await User.create({
                username,
                password: hash,
            });
            res.render("login", { msg: "User successfully created" });
        });
    } catch (err) {
        next(err);
    }
};

module.exports.getProfile = async (req, res, next) => {
    try {
        res.render("profile", {
            username: req.session.username,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (err) {
        next(err);
    }
};

module.exports.postLogin = async (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.redirect("/profile");
    }
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.render("login", { msg: "Wrong username - password" });
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result) {
                req.session.username = username;
                req.session.isLoggedIn = true;
                res.redirect("/profile");
            } else {
                res.render("login", { msg: "Wrong username - password" });
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports.postLogOut = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
