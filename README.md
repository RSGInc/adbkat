# adbkat

**adbkat** reduces the amount of code needed to use [adbkit](https://github.com/openstf/adbkit) by exposing a Device object that interacts with a specific [device](https://github.com/openstf/adbkit#clientlistdevicescallback) over a specific [client](https://github.com/openstf/adbkit#client) connection.

## Dependencies
* [Node.js](https://nodejs.org) >= 0.10
* [Android SDK Platform-tools](https://developer.android.com/studio/index.html#downloads) ^24.0.1 with the `adb` command included on the system path.

## Installation
```shell
npm install adbkat
```

## Code
* Uses [ESLint](http://eslint.org) for quality and style
* Uses [Jasmine](http://jasmine.github.io/2.5/introduction.html) for unit testing
* Uses [JSDoc](http://usejsdoc.org) for documentation

## Contributing
Before submitting a pull request, make sure that you...

1. Write/edit documentation for all new/modified members that are exposed by a module.
2. If any documentation was written/edited, run `npm run jsdoc` to update the documentation in this README.md.
3. Write unit tests for all new sufficiently significant functions. If a function has a name or is exposed by a module, then it is significant enough that it should be tested.
4. Run all unit tests with `npm test` and correct all failures.
5. Run ESLint with `npm run lint` and correct all warnings and errors.

## API
### Modules

<dl>
<dt><a href="#module_adbkat">adbkat</a></dt>
<dd><p>Encapsulates adbkit&#39;s client and device within a common structure.</p>
</dd>
</dl>

### Classes

<dl>
<dt><a href="#Device">Device</a></dt>
<dd><p>A device that can be communicated with via ADB.</p>
</dd>
</dl>

<a name="module_adbkat"></a>

### adbkat
Encapsulates adbkit's client and device within a common structure.

**Author:** RSG, Inc.  
<a name="module_adbkat.getDevices"></a>

#### adbkat.getDevices() ⇒ <code>Promise.&lt;Array.&lt;Device&gt;&gt;</code>
Retrieves the [Device](#Device)s that represent the devices that are
connected to the computer via ADB.

**Kind**: static method of <code>[adbkat](#module_adbkat)</code>  
**Returns**: <code>Promise.&lt;Array.&lt;Device&gt;&gt;</code> - A promise that resolves with the devices that
are connected to the computer via ADB.  
<a name="Device"></a>

### Device
A device that can be communicated with via ADB.

**Kind**: global class  

* [Device](#Device)
    * [.getPhoneNumber()](#Device+getPhoneNumber) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.install(apk)](#Device+install) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.shell(command)](#Device+shell) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.uninstall(pkg)](#Device+uninstall) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="Device+getPhoneNumber"></a>

#### device.getPhoneNumber() ⇒ <code>Promise.&lt;String&gt;</code>
Retrieves the phone number of the device.

This function uses [dumpstate](http://adbshell.com/commands/adb-shell-dumpstate),
which may not be reliable a reliable method of retrieving the phone
number, depending on your device model. For that reason this function
should be considered experimental, and should only be used if you know
that dumpstate can be used to retrieve your device's phone number.

Note that the promise will take a few minutes to resolve, due to the
size of dumpstate's output.

**Kind**: instance method of <code>[Device](#Device)</code>  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the device's
phone number.  
<a name="Device+install"></a>

#### device.install(apk) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Installs the specified apk file onto the device.

**Kind**: instance method of <code>[Device](#Device)</code>  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise that resolves with true when the app
is successfully installed.  

| Param | Type | Description |
| --- | --- | --- |
| apk | <code>String</code> &#124; <code>Stream</code> | The apk file to install. See [adbkit.Client.install](https://github.com/openstf/adbkit#clientinstallserial-apk-callback). |

<a name="Device+shell"></a>

#### device.shell(command) ⇒ <code>Promise.&lt;String&gt;</code>
Runs the specified shell command on the device. See the official
[ADB shell documentation](https://developer.android.com/studio/command-line/shell.html)
for valid commands.

**Kind**: instance method of <code>[Device](#Device)</code>  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the string output
of the command when the command finishes.  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to run. |

<a name="Device+uninstall"></a>

#### device.uninstall(pkg) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Uninstalls the specified package from the device.

**Kind**: instance method of <code>[Device](#Device)</code>  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise that resolves with true when the
package is finished uninstalling.  

| Param | Type | Description |
| --- | --- | --- |
| pkg | <code>String</code> | The name of the package to uninstall. |

