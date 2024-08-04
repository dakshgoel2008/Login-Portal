const path = require("path");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controller/user");
router.get("/", controller.getHome);

router.get("/login", controller.getLogin);

router.get("/signUp", controller.getSignUp);

router.post("/signUp", controller.postSignUp);
router.get('/profile', (req, res, next) => {
    res.render('profile', { user: req.user });
});
router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("/profile");
    }
);
module.exports = router;

