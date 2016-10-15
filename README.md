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