export class Fixtures {
    constructor(mongoose: any);

    save(fixtures: Object): Promise;

    clear(): Promise;

    clearDatabase(): Promise;
}

export const create = (mongoose: any) => Fixtures;