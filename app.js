const express = require("express");
const MongoStore = require("connect-mongo");
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
        // this is done to make session map available to the db though we have restarted the server.
        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://goeldaksh2008:Pikachu2008@cluster0.dhngknr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        }),
    })
);
hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.use("/", require("./routes/user"));

mongoose
    .connect(
        // connecting to the cloud database mongodbAtlas
        "mongodb+srv://goeldaksh2008:Pikachu2008@cluster0.dhngknr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch(() => {
        console.error("Error connecting to the database!");
    });
