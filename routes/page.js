const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth');
const router = express.Router();
const { User, Game } = require('../models');

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
router.get('/ranking', async (req, res, next) => {
    try {
        const games = await Game.findAll({
            include: {
                model: User,
                attributes: ['id', 'nickname', 'comment'],
            },
            order: [['score', 'DESC']],
            limit: 10,
        });

        res.render('ranking.html', {
            games: games,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;