const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

// Profile Route
router.get('/profile', (req, res) => {
   
        res.render('auth/profile.hbs')
})
router.get('/login', (req, res) => {
   
    res.render('auth/login.hbs')
})
router.get('/logout', (req, res) => {
   
    res.send('logout')
})
router.get('/register', (req, res) => {
   
    res.render('auth/register.hbs')
})

module.exports = router; // #3 export out the router
