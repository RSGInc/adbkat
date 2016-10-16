const adb         = require(`adbkit`),
    consolePrefix = require(`console-prefix`);

/**
 * A device that can be communicated with via ADB.
 */
class Device {
    /**
     * Constructs a Device that will communicate with the specified device
     * using the specified client.
     *
     * #jsdoc-ignore
     *
     * @private
     * @param {Client} client The adbkit client that will be used to communicate
     * with the device. See {@link https://github.com/openstf/adbkit#client adbkit.Client}.
     * @param {AdbkitDevice} device The object used by adbkit to represent the
     * device. See {@link https://github.com/openstf/adbkit#clientlistdevicescallback adbkit.Client.listDevices}.
     */
    constructor (client, device) {
        this.client = client;
        this.id = device.id;
    }

    /**
     * Retrieves the phone number of the device.
     *
     * This function uses {@link http://adbshell.com/commands/adb-shell-dumpstate dumpstate},
     * which may not be a reliable method of retrieving the phone
     * number, depending on your device model. For that reason this function
     * should be considered experimental, and should only be used if you know
     * that dumpstate can be used to retrieve your device's phone number.
     *
     * Note that the promise will take a few minutes to resolve, due to the
     * size of dumpstate's output.
     *
     * @return {Promise<String>} A promise that resolves with the device's
     * phone number.
     */
    getPhoneNumber () {
        return this.shell(`dumpstate`).
            then(output => {
                const none        = 0,
                    afterAreaCode = 3,
                    afterOffice   = 7,
                    phone         = Array.from(/mMdn=(\d{10})/.exec(output)[1]);

                phone.splice(afterAreaCode, none, `-`);
                phone.splice(afterOffice,   none, `-`);

                return this.phoneNumber = phone.join(``);
            });
    }

    /**
     * Installs the specified apk file onto the device.
     *
     * @param {String|Stream} apk The apk file to install. See
     * {@link https://github.com/openstf/adbkit#clientinstallserial-apk-callback adbkit.Client.install}.
     * @return {Promise<Boolean>} A promise that resolves with true when the app
     * is successfully installed.
     */
    install (apk) {
        return this.client.install(this.id, apk);
    }

    /**
     * Runs the specified shell command on the device. See the official
     * {@link https://developer.android.com/studio/command-line/shell.html ADB shell documentation}
     * for valid commands.
     *
     * @param {String} command The command to run.
     * @return {Promise<String>} A promise that resolves with the string output
     * of the command when the command finishes.
     */
    shell (command) {
        return this.client.shell(this.id, command).
            then(adb.util.readAll).
            then(output => String(output));
    }

    /**
     * Uninstalls the specified package from the device.
     *
     * @param {String} pkg The name of the package to uninstall.
     * @return {Promise<Boolean>} A promise that resolves with true when the
     * package is finished uninstalling.
     */
    uninstall (pkg) {
        const id = this.id;

        consolePrefix(id).log(`uninstalling ${pkg}`);

        return this.client.uninstall(id, pkg);
    }
}

module.exports = Device;