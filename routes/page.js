const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/join', (req, res) => {
    res.render('join.html');
});
router.get('/login', (req, res) => {
    res.render('login.html');
});


module.exports = router;