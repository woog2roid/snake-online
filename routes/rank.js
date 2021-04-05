const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth');
const router = express.Router();
const User = require('../models/user');
const Game = require('../models/game');

router.post('/', async (req, res, next) => {
    if (req.isAuthenticated()) {
        const id = req.user.id;
        const score = req.body.score;
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) throw new Error;
            else {
                await Game.create({
                    score: score,
                    player: id,
                });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
});

module.exports = router;