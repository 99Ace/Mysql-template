const express = require("express");
const router = express.Router(); // #1 - Create a new express Router
const crypto = require('crypto');

// Hash password function
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

// import in the Forms
const { bootstrapField, createRegistrationForm, createLoginForm } = require('../forms');

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
                'password': getHashedPassword(form.data.password),
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
// Logout Route
router.get('/logout', (req, res) => {
    req.session.user = null;
    req.flash('success_messages', "Goodbye");
    res.redirect('/auth/login');
})
// Login Route
router.get('/login', (req, res) => {
    console.log("Login Route")
    console.log(req.session.user)

    const loginForm = createLoginForm();
    res.render('auth/login.hbs', {
        'form': loginForm.toHTML(bootstrapField)
    })
})
router.post('/login', async (req, res) => {
    // create instant of form
    const loginForm = createLoginForm();
    
    loginForm.handle(req, {
        'success': async (form) => {
            // process the login
            // ...find the user by email and password
            let user = await User.where({
                'email': form.data.email
            }).fetch({
                require: false
            }
            );
            
            if (!user) {
                req.flash("error_messages", "Sorry, the authentication details you provided does not work.")
                res.redirect('/auth/login');
            } else {
                // check if the password matches
                if (user.get('password') === getHashedPassword(form.data.password)) {
                    // add to the session that login succeed
                    // store the user details
                    req.session.user = {
                        id: user.get('id'),
                        username: user.get('username'),
                        email: user.get('email')
                    }
                    req.flash("success_messages", "Welcome back, " + user.get('username'));
                    res.redirect('/auth/profile');
                } else {
                    req.flash("error_messages", "Sorry, the authentication details you provided does not work.")
                    res.redirect('/auth/login')
                }
            }
        }, 'error': (form) => {
            req.flash("error_messages", "There are some problems logging you in. Please fill in the form again")
            res.render('auth/login', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

// Profile Route
router.get('/profile', (req, res) => {
    const user = req.session.user;
    console.log(user)
    if (!user) {
        req.flash('error_messages', 'You do not have permission to view this page');
        res.redirect('/auth/login');
    } else {
        res.render('auth/profile.hbs', {
            'user': user
        })
    }
})



module.exports = router; // #3 export out the router
