var expect = require('chai').expect
    , sinon = require('sinon')
    , AuthCtrl = require('../../../controllers/authController')
    , User = require('../../../models/User');

describe('Auth controller Unit Tests - ', function() {

    var req = { }
        , res = {}
        , next = {}
        , sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('adduser()', function() {

        beforeEach(function() {
            req.body = {
                email: "user",
                password: "pass",
                role: 1
            };
        });

        it('should return a 400 when user validation fails', function(done) {

            var userValidateStub = sandbox.stub(User, 'validate').throws();
            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(400);
                done();
            };

            AuthCtrl.addUser(req, res, next);
        });

        it('should return a 403 when UserAlreadyExists error is returned from User.addUser()', function(done) {
            var userValidateStub = sandbox.stub(User, 'validate').returns();
            var userAddUserStub = sandbox.stub(User, 'addUser', function(email, password, role, callback) {
                callback('UserAlreadyExists');
            });

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(403);
                done();
            };

            AuthCtrl.addUser(req, res, next);
        });

        it('should return a 500 if error other than UserAlreadyExists is returned from User.addUser()', function(done) {
            var userValidateStub = sandbox.stub(User, 'validate').returns();
            var userAddUserStub = sandbox.stub(User, 'addUser', function(email, password, role, callback) {
                callback('SomeError');
            });

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(500);
                done();
            };

            AuthCtrl.addUser(req, res, next);
        });

        it('should return a 200 with a email and role in the response body', function(done) {
            var userValidateStub = sandbox.stub(User, 'validate').returns();
            var userAddUserStub = sandbox.stub(User, 'addUser', function(email, password, role, callback) {
                callback(null, req.body);
            });
            req.logIn = function(user, callback) { return callback(null); };

            res.json = function(httpStatus, user) {
                expect(httpStatus).to.equal(200);
                expect(user[0].email).to.exist;
                expect(user[0].role).to.exist;
                done();
            };

            AuthCtrl.addUser(req, res, next);
        });
    });
});