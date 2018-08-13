import * as mongoose from '@types/mongoose';

export class Fixtures {
    constructor(mongoose: mongoose);

    save(fixtures: Object): Promise;

    clear(): Promise;

    clearDatabase(): Promise;
}

export const create = (mongoose: mongoose) => Fixtures;