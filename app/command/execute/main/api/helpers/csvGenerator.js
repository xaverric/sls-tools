const {Parser, transforms: {unwind, flatten}} = require('json2csv');

/**
 * Transforms provided array of objects into the CSV content type
 *
 * @param array - array of objects containing data (keys) to transformation into the CSV content type
 * @param fields - array objects field names transformed into the CSV columns
 * @param unwindObject - object containing unwind configuration
 * @param flattenObject - object containing flatten configuration
 @returns {} - CSV text content
 */
const generateToCSV = (array, fields, unwindObject = {paths: [], blankOut: false}, flattenObject = { objects: false, arrays: false }) => {
    const transforms = [unwind(unwindObject), flatten(flattenObject)];
    const jsonToCSV = new Parser({fields, transforms});
    return jsonToCSV.parse(array);
}

module.exports = {
    generateToCSV
};