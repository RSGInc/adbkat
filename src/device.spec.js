const proxyquire = require(`proxyquire`);

require(`jasmine-promises`);

describe(`Device`, () => {
    describe(`constructor`, () => {
        let client, id, device;

        beforeAll(() => {
            const Device = proxyquire(`./device`, {});

            client = {};
            id     = {};
            device = new Device(client, {id});
        });

        it(`assigns the specified client to the Device`, () =>
            expect(device.client).toBe(client)
        );

        it(`assigns the specified adbkit device's id to the Device`, () =>
            expect(device.id).toBe(id)
        );
    });

    describe(`getPhoneNumber`, () => {
        const Device = proxyquire(`./device`, {}),
            device   = new Device(null, {});

        let command;

        device.shell = commandSent => {
            command = commandSent;

            return Promise.
                resolve(`FEQ@#WFDdfasd#RQAFmMdn=8022954999#@GEvna8fju#R@FDdf9`);
        };

        const gotNumber = device.getPhoneNumber();

        it(`dumps the device state`, () => expect(command).toBe(`dumpstate`));

        it(`retrieves and formats the number from the device state`, () =>
            gotNumber.
                then(phoneNumber => expect(phoneNumber).toBe(`802-295-4999`))
        );
    });

    describe(`install`, () => {
        const returned = {};

        let install, id, apk, call, args;

        beforeAll(() => {
            const Device = proxyquire(`./device`, {});

            install = jasmine.createSpy(`install`).and.returnValue(returned);
            id      = {};
            apk     = {};

            new Device({install}, {id}).install(apk);

            call = install.calls.first();
            args = call.args;
        });

        it(`installs onto the device`, () => expect(args[0]).toBe(id));

        it(`installs the specified apk`, () => expect(args[1]).toBe(apk));

        it(`returns what the client returns`, () =>
            expect(call.returnValue).toBe(returned)
        );
    });

    describe(`shell`, () => {
        const output = Date.now();

        let shell, id, command, args, completed;

        beforeAll(() => {
            const readAll = jasmine.createSpy(`readAll`).
                    and.callFake(clientOutput => clientOutput),
                Device = proxyquire(`./device`, {adbkit: {util: {readAll}}});

            shell = jasmine.createSpy(`shell`).and.returnValue(
                new Promise(resolve => resolve(output))
            );
            id      = {};
            command = {};

            completed = new Device({shell}, {id}).shell(command);

            args = shell.calls.first().args;
        });

        it(`sends the command to the device`, () =>
            completed.then(() => expect(args[0]).toBe(id))
        );

        it(`sends the specified command`, () =>
            completed.then(() => expect(args[1]).toBe(command))
        );

        it(`resolves with the command's string output`, () =>
            completed.then(value => expect(value).toBe(String(output)))
        );
    });

    describe(`uninstall`, () => {
        const value       = {},
            log           = jasmine.createSpy(`log`),
            consolePrefix = jasmine.createSpy(`consolePrefix`).
                and.returnValue({log});

        let id, pkg, call, args;

        beforeAll(() => {
            const Device = proxyquire(`./device`, { //eslint-disable-line max-len
                    'console-prefix': consolePrefix
                }),
                uninstall = jasmine.createSpy(`uninstall`).
                    and.returnValue(value);

            id  = {};
            pkg = `com.foo.bar`;

            new Device({uninstall}, {id}).uninstall(pkg);

            call = uninstall.calls.first();
            args = call.args;
        });

        it(`will log the event with the device id`, () =>
            expect(consolePrefix.calls.first().args[0]).toBe(id)
        );

        it(`logs the event to the console`, () =>
            expect(log).toHaveBeenCalledWith(`uninstalling ${pkg}`)
        );

        it(`uninstalls from the device`, () => expect(args[0]).toBe(id));

        it(`uninstalls the specified package`, () => expect(args[1]).toBe(pkg));

        it(`returns what the client returns`, () =>
            expect(call.returnValue).toBe(value)
        );
    });
});