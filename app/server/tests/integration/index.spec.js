var app = require('../../../server'),
    request = require('supertest'),
    passportStub = require('passport-stub');
passportStub.install(app);

// user account
var user = {
    'email':'newUser@gmail.com',
    'role':{bitMask: 2,title: "user"},
    'password':'12345'
};

// user account 2 - no role
var user2 = {
    'email':'newUser@gmail.com',
    'password':'12345'
};

// admin account
var admin = {
    'email':'admin@gmail.com',
    'role': {bitMask: 4, title: 'admin'},
    'id': '2',
    'password':'123'
};

describe('Server Integration Tests - ', function (done) {
    afterEach(function() {
        passportStub.logout(); // logout after each test
    });
    it('Homepage - Return a 200', function(done) {
        request(app).get('/').expect(200, done);
    });
    it('Logout - Return a 200', function(done) {
        request(app).post('/logout').expect(200, done);
    });
    it('As a Logout user, on /users - Return a 403', function(done) {
        request(app).get('/users').expect(403, done);
    });
    it('Add a new user(no role) - Return a 400', function(done) {
        request(app).post('/adduser').send(user2).expect(400, done);
    });
    /*
    it('Add a new user - Return a 200', function(done) {
        request(app).post('/adduser').send(user).expect(200, done);
    });
    */
    it('As a normal user, on /users - Return a 403', function(done) {
        passportStub.login(user); // login as user
        request(app).get('/users').expect(403, done);
    });
    it('Login as Admin - Return a 200', function(done) {
        request(app).post('/login').send(admin).expect(200, done);
    });
    it('As a Admin user, on /users - Return a 200', function(done) {
        passportStub.login(admin); // login as admin
        request(app).get('/users').expect(200, done);
    });
});
