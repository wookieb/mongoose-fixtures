'use strict';

const Fixtures = require('./src/Fixtures');

module.exports = (mongoose) => {
    return new Fixtures(mongoose || require('mongoose'));
};

module.exports.Fixtures = Fixtures;