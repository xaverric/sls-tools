const Zip = require("adm-zip");
const path = require("path");
const {AbstractZipEntries} = require("./AbstractZipEntries");

/**
 * Wrapper helper class for loading the ZIP data
 */
class ZipEntries extends AbstractZipEntries {

    constructor(left, leftName, right, rightName) {
        super(left, leftName, right, rightName);
    }

    static initFromData = (leftZipEntry, rightZipEntry) => {
        const result = {
            left: new Zip(leftZipEntry.getData(), {}).getEntries().filter(item => !item.isDirectory),
            right: new Zip(rightZipEntry.getData(), {}).getEntries().filter(item => !item.isDirectory)
        };

        return new ZipEntries(result.left, "left", result.right, "right");
    }

    static initFromArgs = (cmdArgs) => {
        const leftSideZip = new Zip(path.resolve(cmdArgs.left), {});
        const rightSideZip = new Zip(path.resolve(cmdArgs.right), {});

        const result = {
            left: leftSideZip.getEntries().filter(item => !item.isDirectory),
            right: rightSideZip.getEntries().filter(item => !item.isDirectory)
        };

        return new ZipEntries(result.left, cmdArgs.left, result.right, cmdArgs.right);
    }

}

module.exports = {ZipEntries};
