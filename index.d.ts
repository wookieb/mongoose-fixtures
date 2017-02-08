import * as mongoose from '@types/mongoose';

export class Fixtures {
    constructor(mongoose: mongoose);

    save(fixtures: Object, callback?: (err: any) => void): Promise;

    clear(callback?: (err: any) => void): Promise;

    clearDatabase(callback?: (err: any) => void): Promise;
}


interface fixturesLoader {
    (mongoose?: mongoose): Fixtures,
    Fixtures: Fixtures
}
export = fixturesLoader;