const supertest = require('supertest'),
    chai = require('chai'),
    app = require('../index.js');

    global.app = app;
    global.request = supertest(app);
    global.expect = chai.expect;