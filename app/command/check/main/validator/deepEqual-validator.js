const validate = (dtoOut, condition) => {
    let isEqual = _deepEqual(condition.expectedDtoOut, dtoOut);
    return {
        validationStatus: isEqual,
        errorMessage: isEqual ? undefined : `Objects are not identical. Expected: ${JSON.stringify(condition.expectedDtoOut)}, Current: ${JSON.stringify(dtoOut)}`
    }
}

const _deepEqual = (x, y) => {
    return (x && y && typeof x === 'object' && typeof y === 'object') ?
        (Object.keys(x).length === Object.keys(y).length) && Object.keys(x).reduce((isEqual, key) => {
            return isEqual && _deepEqual(x[key], y[key]);
        }, true) :
        (x === y);
};

module.exports = validate;