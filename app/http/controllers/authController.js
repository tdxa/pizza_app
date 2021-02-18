const User = require("../../models/user")
const bcrypt = require('bcryptjs');

function authController() {
    return {
        register(req, res) {
            res.render('auth/register');
        },
        postRegister(req, res) {
            const { name, email, password, password2 } = req.body;
            let errors = [];

            if (!name || !email || !password || !password2) {
                if (password !== password2) {
                    errors.push({ msg: "Passwords don't match" });
                }
                if (password.length < 6) {
                    errors.push({ msg: 'Password is too short! Should be at least 6 characters.' })
                }
                if (errors.length > 0) {
                    errors.forEach(err => {
                        req.flash('error', err.msg)
                    });
                    console.log(errors)
                    res.render('./auth/register', {
                        errors,
                        name,
                        email
                    });
                } else {
                    User.findOne({ email: email }).then(user => {
                        if (user) {
                            errors.push({ msg: 'Email is already registered!' });
                            res.render('./auth/register', {
                                errors,
                                name,
                                email
                            });
                        } else {
                            const newUser = new User({
                                name,
                                email,
                                password
                            });

                            bcrypt.genSalt(10, (error, salt) =>
                                bcrypt.hash(newUser.password, salt, (error, hash) => {
                                    if (error) throw error;
                                    newUser.password = hash;

                                    newUser.save().then(user => {
                                        res.redirect('/login');
                                    }).catch(err => console.log(err));
                                }));
                        }
                    })
                }
            }
        },

        login(req, res) {
            res.render('auth/login');
        }
    }
}

module.exports = authController