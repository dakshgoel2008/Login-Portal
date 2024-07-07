const express = require("express");
const path = require("path");
const hbs = require("hbs");
const PORT = 3000;
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("view engine", "hbs");
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
    })
);
hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.use("/", require("./routes/user"));

mongoose
    .connect("mongodb://127.0.0.1:27017/authentication")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch(() => {
        console.error("Error connecting to the database!");
    });
