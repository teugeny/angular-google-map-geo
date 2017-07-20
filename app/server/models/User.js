var User
    , _ = require('underscore')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , check = require('validator').check
    , mysql = require('mysql')
    , dbconfig = require('../database')
    , db = mysql.createConnection(dbconfig.connection);

db.query('USE ' + dbconfig.database);

module.exports = {

    /**
     *
     * @param email
     * @param password
     * @param role
     * @param callback
     * @returns {*}
     */
    addUser: function (email, password, role, callback) {

        this.findByEmail(email,function (user) {
            if (user !== undefined) {
                callback('Already exists',null)
            } else {
                var inserQuery = 'INSERT INTO `monitoring_crm`.`users` (`email`, `password`, `role`) VALUES ("'+email+'", "'+password+'", '+"'"+JSON.stringify(role)+"'"+');';

                db.query(inserQuery,function (err, rows) {

                    if (!err) {
                        var user = {
                            id: rows.insertId,
                            email: email,
                            password: password,
                            role: role
                        };
                        callback(null,user);
                    } else {
                        callback(err,null);
                    }
                });
            }
        });
    },

    /**
     * Get all users from DB
     * @param callback
     */
    findAll: function (callback) {
        db.query("select * from users",function (err, rows) {
            var data = rows
                ? rows
                : null;
            callback(data);
        })
    },

    /**
     * Get user by id
     * @param id
     * @param callback
     */
    findById: function (id, callback) {
        db.query("select * from users where id = ?",[id],function (err, rows) {
            if (!err && rows[0] !== null) {
                rows[0].role = JSON.parse(rows[0].role);
                callback(rows[0]);
            } else {
                callback(undefined);
            }
        })
    },

    /**
     * Get user by username
     * @param email
     * @param callback
     */
    findByEmail: function (email, callback) {
        db.query("select * from users where email = ?",[email],function (err, rows) {

            var res = rows[0] !== null
                ? rows[0]
                : undefined;

            if (callback !== null) {
                callback(res);
            }
        });
    },

    /**
     * Validate user data
     * @param user
     */
    validate: function (user) {
        check(user.email, 'Email must be 1-12 characters long').len(1, 12);
        check(user.password, 'Password must be 5-60 characters long').len(5, 60);
        check(user.email).len(6, 64).isEmail();
    },

    /**
     * Local strategy of passport authorisation
     */
    localStrategy: new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            module.exports.findByEmail(email, function (user) {
                if(!user) {
                    done(null, false, { message: 'Incorrect username.' });
                }
                else if(user.password != password) {
                    done(null, false, { message: 'Incorrect username.' });
                }
                else {
                    user.role = JSON.parse(user.role);
                    return done(null, user);
                }
            });

        }
    ),

    /**
     *
     * @param user
     * @param done
     */
    serializeUser: function(user, done) {
        done(null, user.id);
    },

    /**
     *
     * @param id
     * @param done
     */
    deserializeUser: function(id, done) {
        module.exports.findById(id, function(user) {
            if(user)    { done(null, user); }
            else        { done(null, false); }
        });
    }
};