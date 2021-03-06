const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
const cors = require('cors')

// Setup dotenv
require("dotenv").config();

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
    express.urlencoded({
        extended: false
    })
);

// set up CORS 
app.use(cors());

// set up sessions
app.use(session({
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(flash())
// Register Flash middleware
app.use(function (req, res, next) {
    res.locals.success_messages = req.flash("success_messages");
    res.locals.error_messages = req.flash("error_messages");
    next();
});

// Routes
const authRoutes = require('./routes/auth');
const providerRoutes = require('./routes/provider');

async function main() {

    app.get('/', (req, res) => {
        res.render('index.hbs')
    })
    app.use('/auth', authRoutes);
    app.use('/provider', providerRoutes);



    app.listen(3000, () => {
        console.log("Server has started");
    });
}

main();