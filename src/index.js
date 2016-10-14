/**
 * Encapsulates adbkit's client and device within a common structure.
 *
 * @module adbkat
 * @author RSG, Inc.
 */
const adbkit = require(`adbkit`),
    Device   = require(`./device`);

module.exports = {
    /**
     * Retrieves the {@link Device}s that represent the devices that are
     * connected to the computer via ADB.
     *
     * @return {Promise<Device[]>} A promise that resolves with the devices that
     * are connected to the computer via ADB.
     */
    getDevices: () => {
        const client = adbkit.createClient();

        return client.listDevices().then(devices =>
            Promise.all(devices.map(device => new Device(client, device)))
        );
    }
};