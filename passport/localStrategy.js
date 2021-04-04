const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async (id, password, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            console.log(user);
            console.log(password);
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                console.log(result);
                if (result) done(null, user);
                else done(null, false);
            }
            else {
                done(null, false);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};