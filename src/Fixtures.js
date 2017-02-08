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
     * @param {Function} [callback]
     * @return {Promise}
     */
    save(fixtures, callback) {
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

        const result = Promise.all(
            models.map((m) => m.save())
        )
            .then(models => {
                this.models = this.models.concat(models);
            });

        if (callback) {
            result.then(() => callback())
                .catch(callback);
        }
        return result;
    }

    /**
     * Removes all currently saved fixtures
     *
     * @param {Function} [callback]
     * @return {Promise}
     */
    clear(callback) {
        const result = Promise.all(
            this.models.map(m => model.remove())
        );

        if (callback) {
            result.then(() => callback())
                .catch(callback);
        }
        return result;
    }

    /**
     * Clears database
     *
     * @param {Function} [callback]
     * @returns {Promise}
     */
    clearDatabase(callback) {
        const connection = this.mongoose.connection;

        // for mongoose >= 4.7.9
        if (connection.dropDatabase) {
            return connection.dropDatabase(callback);
        }

        return new Promise((resolve) => {
            // Workaround: https://github.com/Automattic/mongoose/issues/4490
            if (connection.readyState !== 1) {
                connection.once('connected', () => {
                    resolve(connection.db.dropDatabase(callback));
                });
            } else {
                resolve(connection.db.dropDatabase(callback));
            }
        })
    }
}

module.exports = Fixtures;