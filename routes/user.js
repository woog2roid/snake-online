const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth');
const router = express.Router();
const User = require('../models/user');

router.post('/mypage', isLoggedIn, async (req, res, next) => {
    const { nickname, comment } = req.body;
    const id = req.user.id;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error;
        else {
            await User.update({
                nickname, comment
            }, {
                where: {id}
            });
            return res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


module.exports = router;