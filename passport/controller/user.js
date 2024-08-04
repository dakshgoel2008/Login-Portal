const Users = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

module.exports.getLogin = (req, res) => {
    res.render("login");
};

module.exports.getSignUp = (req, res) => {
    res.render("signup");
};

module.exports.postLogin = (req, res, next) => {
    // Login logic here
};

module.exports.postSignUp = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let user = await Users.findOne({ username });
        if (user) {
            return res.render("signup", {
                msg: "This username already exists, try a new one",
            });
        }
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error(err);
                return next(err); // Proper error handling
            }
            try {
                user = await Users.create({
                    username,
                    password: hash,
                });
                res.redirect("/login"); // Redirect to login page
            } catch (err) {
                console.error(err);
                next(err);
            }
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports.getHome = (req, res, next) => {
    res.render("home");
};
