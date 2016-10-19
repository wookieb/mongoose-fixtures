'use strict';

const async = require('async');

class Fixtures {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.models = [];
    }

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

        async.each(models, (model, cb) => {
            model.save(cb);
        }, (err) => {
            if (err) {
                callback && callback(err);
                return;
            }
            this.models = this.models.concat(models);
            callback(null, models);
        });
    }

    clear(callback) {
        async.each(this.models, (model, cb) => {
            model.remove(cb);
        }, callback);
    }

    clearDatabase() {
        this.mongoose.connection.db.dropDatabase(callback);
    }
}

module.exports = Fixtures;