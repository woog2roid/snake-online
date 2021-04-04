const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { Router } = require('express');

const router = express.Router();

router.post('/join', async (req, res, next) => {
    const { id, password, nickname } = req.body;
    try {
        const isUnique = await User.findOne({ where: {id} });
        if (isUnique) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            id, password: hash, nickname
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authEror) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect('/loginError');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    req.redirect('/');
});

module.exports = router;