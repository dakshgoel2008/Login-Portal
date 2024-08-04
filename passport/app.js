const express = require("express");
const path = require("path");
const hbs = require("hbs");
const PORT = 4444;
const app = express();
const routes = require("./routes/user");
const mongoose = require("mongoose");
const session = require("express-session");

// passport requires sessions so as to manage who is getting loggedin.
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
    })
);

// passport setup => required.
const passport = require("./authentication/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.use("/", routes);

mongoose.connect("mongodb://127.0.0.1:27017/authentication").then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    });
});
