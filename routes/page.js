const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join.html');
});
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login.html');
});
router.get('/mypage', isLoggedIn, (req, res) => {
    res.render('mypage.html');
});

module.exports = router;