const User = require("../models/user"); // requiring the collection userDB
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
    const { username, password } = req.body; // retrieved from <form> made in hbs files.
    try {
        let user = await User.findOne({ username }); // apply search in db named 'authentication' in 'app.js file'
        // if user existed select new username
        if (user) {
            return res.render("signUp", { msg: "User already exists" });
        }
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            // else mein collection ko create karo
            user = await User.create({
                // creating document in collection userDB
                username,
                password: hash,
            });
            res.render("login", { msg: "User crated successfully created" });
        });
    } catch (err) {
        next(err);
    }
};

module.exports.getProfile = async (req, res, next) => {
    try {
        res.render("profile");
    } catch (err) {
        next(err);
    }
};

module.exports.postLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.render("login", { msg: "Wrong username - password" });
        }
        // here password is the string that user is entering on being signed up once
        // and user.password is the actual password of that particular user.
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) res.render('profile',{username})
        });
    } catch (err) {
        next(err);
    }
};
