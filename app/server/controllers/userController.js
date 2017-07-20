/**
 * User controller
 * @type {_}
 * @private
 */
var _ =           require('underscore')
    , User =      require('../models/User.js');

module.exports = {
    /**
     * Return list of registered users
     * @param req
     * @param res
     */
    index: function(req, res) {
        User.findAll(function(users) {
            _.each(users, function(user) {
                user.role = JSON.parse(user.role);
                delete user.password;
            });
            res.json(users);
        });
    }
};