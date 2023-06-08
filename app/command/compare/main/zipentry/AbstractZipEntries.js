const path = require("path");

class AbstractZipEntries {

    constructor(left, leftName, right, rightName) {
        this.left = left;
        this.leftName = leftName;
        this.right = right;
        this.rightName = rightName;
    }

    getLeft = () => {
        return this.left;
    }

    getLeftName = () => {
        return path.basename(this.leftName);
    }

    getRight = () => {
        return this.right;
    }

    getRightName = () => {
        return path.basename(this.rightName)
    }

    getEntriesNames = () => {
        return {
            left: this._mapEntriesNames(this.left),
            right: this._mapEntriesNames(this.right),
        }
    }

    _mapEntriesNames = (entries) => {
        return entries.map(item => item.entryName);
    }

    getSymetricDifference = () => {
        const entriesNames = this.getEntriesNames();
        return {
            left: entriesNames.left.filter(item => !entriesNames.right.includes(item)),
            right: entriesNames.right.filter( item => !entriesNames.left.includes(item))
        }
    }

    /**
     * Returns elements which intersects by entry name (filename + path in zip) from the given side (left or right).
     *
     * @param side - left|right
     * @returns {*} - Array of elements from requested side, which intersects with elements in the other side.
     */
    getIntersectionByName = (side = "left") => {
        const otherSide = side === "left" ? "right" : "left";
        return this[side].filter(firstItem => this[otherSide].find(secondItem => firstItem.entryName === secondItem.entryName))
    }
}

module.exports = {AbstractZipEntries}