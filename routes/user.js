const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
const checkLoggedIn = require("../middlewares/checkLoggedIn");
const checkNotLoggedIn = require("../middlewares/checkLoggedOut");

router.get("/", controller.getHome);

router.get("/login", checkNotLoggedIn, controller.getLogin);

router.get("/signUp", checkNotLoggedIn, controller.getSignUp);

router.post("/login", checkNotLoggedIn, controller.postLogin);

router.post("/signUp", checkNotLoggedIn, controller.postSignUp);

router.get("/profile", checkLoggedIn, controller.getProfile);

router.post("/logOut", controller.postLogOut);

module.exports = router;