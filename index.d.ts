import * as mongoose from '@types/mongoose';

export class Fixtures {
    constructor(mongoose: mongoose);

    save(fixtures: Object, callback?: (err: any) => void): Promise<any>;

    clear(callback?: (err: any) => void): Promise<any>;

    clearDatabase(callback?: (err: any) => void): Promise<any>;
}

export declare function create(mongoose: mongoose): Fixtures;