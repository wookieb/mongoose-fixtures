'use strict';

const async = require('async');

class Fixtures {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.models = [];
    }

    /**
     * Saves fixtures
     * Provided fixtures argument must be an object where keys are mongoose models names and the values must be an array
     * of objects to save as given model.
     *
     * @param {Object} fixtures
     * @return {Promise}
     */
    save(fixtures) {
        const models = Object.keys(fixtures)
            .map((key) => {
                return fixtures[key].map((fixture) => {
                    if (fixture instanceof this.mongoose.Model) {
                        return fixture;
                    }
                    const Model = this.mongoose.model(key);
                    return new Model(fixture);
                });
            })
            .reduce((result, fixtures) => {
                return result.concat(fixtures);
            }, []);

        return Promise.all(
            models.map((m) => m.save())
        )
            .then(models => {
                this.models = this.models.concat(models);
            });
    }

    /**
     * Removes all currently saved fixtures
     *
     * @return {Promise}
     */
    clear() {
        return Promise.all(
            this.models.map(m => model.remove())
        );
    }

    /**
     * Clears database
     *
     * @returns {Promise}
     */
    clearDatabase() {
        return this.mongoose.connection.db.dropDatabase();
    }
}

module.exports = Fixtures;