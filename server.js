const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const User = require("./api/users");
const notification = require("./api/notification");
const story = require("./api/story");

const router = express.Router();
const app = express();

//Bdoy parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);
const port = 5000;

app.use("/api/user", User);

app.use("/api/notificaton", notification);
app.use("/api/story", story);

app.use(router);

app.listen(port, () => console.log(`Server running on ${port}`));
