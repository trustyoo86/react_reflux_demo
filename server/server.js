import express from 'express';
import consign from 'consign';

var server = express();

consign()
    .then('modules/middleware.js')
    .then('routes')
    .then('modules/boot.js')
    .into(server);

module.exports = server;