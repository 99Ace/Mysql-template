const express = require("express");
const router = express.Router(); // #1 - Create a new express Router
const crypto = require('crypto');

// import in the Forms
const { bootstrapField, createNewBizForm } = require('../forms');
// import in the User model
const { Provider } = require('../models');


router.get('/register', (req, res) => {
    const registerForm = createNewBizForm();
    res.render('provider/register.hbs', {
        // pass the form to hbs using bootstrapField for styling
        'form': registerForm.toHTML(bootstrapField)
    })
})


module.exports = router; // #3 export out the router
