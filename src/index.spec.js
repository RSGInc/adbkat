const proxyquire = require(`proxyquire`);

describe(`adbkat`, () => {
    describe(`getDevices`, () => {
        let adbkitDevices, client, gotDevices;

        beforeAll(() => {
            adbkitDevices = [{id: 1}, {id: 2}, {id: 3}];
            client        = {listDevices: () => Promise.resolve(adbkitDevices)};

            const adbkat = proxyquire(`.`, {
                './device': class {
                    constructor (deviceClient, adbkitDevice) {
                        this.client = deviceClient;
                        this.device = adbkitDevice;
                    }
                },
                adbkit: {createClient: () => client}
            });

            gotDevices = adbkat.getDevices();
        });

        describe(`resolves with Devices that`, () => {
            it(`use a new client`, () => gotDevices.then(adbkatDevices =>
                expect(adbkatDevices.every(device => device.client === client)).
                    toBe(true)
            ));

            it(`use adbkit devices`, () => gotDevices.then(adbkatDevices =>
                expect(adbkatDevices.map(device => device.device)).
                    toEqual(adbkitDevices)
            ));
        });
    });
});