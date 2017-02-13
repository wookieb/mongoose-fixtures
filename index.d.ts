export class Fixtures {
    constructor(mongoose: any);

    save(fixtures: Object, callback?: (err: any) => void): Promise<any>;

    clear(callback?: (err: any) => void): Promise<any>;

    clearDatabase(callback?: (err: any) => void): Promise<any>;
}

export declare function create(mongoose: any): Fixtures;