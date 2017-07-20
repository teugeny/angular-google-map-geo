/**
 * Authorisation user controller
 * @type {Passport}
 */

var passport =  require('passport'),
    User = require('../models/User.js');

module.exports = {
    /**
     *
     * @param req
     * @param res
     */
    addUser: function(req, res) {
        try {
            User.validate(req.body);
        }
        catch(err) {
            return res.send(400, err.message);
        }

        User.addUser(req.body.email, req.body.password, req.body.role, function(err, user) {
            if(err === 'UserAlreadyExists') return res.send(403, "User already exists");
            else if(err)                    return res.send(500);
            User.findAll(function (rows) {
                res.json(200,rows);
            });
        });

    },

    /**
     * Login user
     * @param req
     * @param res
     * @param next
     */
    login: function(req, res, next) {
        passport.authenticate('local', function(err, user) {

            if(err)     { return next(err); }
            if(!user)   { return res.send(400); }

            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }

                if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                res.json(200, { "role": user.role, "username": user.username });
            });
        })(req, res, next);
    },

    /**
     * Logout user
     * @param req
     * @param res
     */
    logout: function(req, res) {
        req.logout();
        res.send(200);
    }
};