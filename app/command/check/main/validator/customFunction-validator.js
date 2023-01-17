const validate = (dtoOut, condition) => {
    let result = condition.function(dtoOut);
    if (result.validationStatus) {
        result.errorMessage = undefined;
    }
    return result;
}

module.exports = validate;