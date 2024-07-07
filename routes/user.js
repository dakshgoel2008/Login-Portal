const path = require("path");
const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
router.get("/", controller.getHome);

router.get("/login", controller.getLogin);

router.get("/signUp", controller.getSignUp);

router.post("/login", controller.postLogin);

router.post("/signUp", controller.postSignUp);

router.get('/profile', controller.getProfile);

module.exports = router;
