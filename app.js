require("dotenv").config();
var express = require("express");
var app = express();
const cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
const cors = require("cors");
const axios = require("axios"); 
const morgan = require("morgan");
const moment = require("moment");
  
//Routes
const authenticationRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoutes"); 



//middleware
const { checkAuth } = require("./middleware/auth");

//models
const { Class } = require("./models/class");
const { Instructor } = require("./models/instructor");
const { Student } = require("./models/student");
// const { User } = require("./models/user");
var db = require("./models/index");
const port = process.env.PORT;

//Set and Use
app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use(express.static(__dirname + "public"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: "123",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
// app.use(moment());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.moment = moment
  next();
});

app.use(cors({}));

//Routes
app.use("/class", classRoutes);
app.use("/auth", authenticationRoutes);


app.get("/", async (req, res) => {
});


app.get("/cookie", checkAuth, function (req, res) {
  console.log("Cookies: ", req.cookies);
  res.clearCookie();
  console.log("Signed Cookies: ");
});
 
// app.listen(port, "0.0.0.0", () => console.log(`Hello to ${port}`));
app.listen(3013, () => console.log(`Hello to ${port}`));

