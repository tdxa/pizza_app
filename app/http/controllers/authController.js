const User = require("../../models/user")
const bcrypt = require('bcryptjs');
const passport = require('passport');

function authController() {
    return {

        register(req, res) {
            res.render('auth/register');
        },


        postRegister(req, res) {
            const { name, email, password, password2 } = req.body;
            let errors = [];

            if (!name || !email || !password || !password2) {
                errors.push({ msg: 'Please fill in all fields!' })
            }

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
                res.render('./auth/register', {
                    errors,
                    name,
                    email
                });
            } else {
                User.findOne({ email: email }).then(user => {
                    if (user) {
                        console.log(errors)
                        req.flash('error', 'Email is already registered!')
                        res.render('./auth/register', {
                            errors,
                            name,
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
        },


        login(req, res) {
            res.render('auth/login');
        },


        postLogin(req, res, next) {
            passport.authenticate('local',
                {
                    successRedirect: '/',
                    failureRedirect: '/login',
                    failureFlash: true
                })(req, res, next)
        },


        logout(req, res) {
            req.logout();
            req.flash('error', 'You have been successfully logged out!')
            return res.redirect('/login');
        }
    }
}

module.exports = authController