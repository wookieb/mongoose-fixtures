'use strict';

const Fixtures = require('./src/Fixtures');

/**
 * Creates fixtures instance that use given mongoose instance
 *
 * @param {mongoose} [mongoose] if not provided then default mongooose used
 * @returns {Fixtures}
 */
exports.create = (mongoose) => {
    return new Fixtures(mongoose || require('mongoose'));
};

exports.Fixtures = Fixtures;