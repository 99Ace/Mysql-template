const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");

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

async function main() {

    app.get('/', (req,res)=> {
        res.render('index.hbs')
    })



    app.listen(process.env.PORT, () => {
        console.log("Server has started");
    });
}

main();