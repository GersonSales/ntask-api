const express = require('express'),
    consign = require('consign');

const app = express();

consign()
    .include('db.js')
    .then('models')
    .then('/libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);

module.exports = app;