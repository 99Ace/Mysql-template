const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

// import in the Forms
const { bootstrapField, createRegistrationForm } = require('../forms');

// import in the User model
const { User } = require('../models');

// Register Route
router.get('/register', (req, res) => {
    // display the registration form
    // Create instant of the form
    const registerForm = createRegistrationForm();
    res.render('auth/register.hbs', {
        // pass the form to hbs using bootstrapField for styling
        'form': registerForm.toHTML(bootstrapField)
    })
})
router.post('/register', (req, res) => {
    const registerForm = createRegistrationForm();
    registerForm.handle(req, {
        success: async (form) => {
            const user = new User({
                'username': form.data.username,
                'password': form.data.password,
                'email': form.data.email
            });
            await user.save();
            req.flash("success_messages", "User signed up successfully!");
            res.redirect('/auth/login')
        },
        'error': (form) => {
            res.render('auth/register', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})



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


module.exports = router; // #3 export out the router
