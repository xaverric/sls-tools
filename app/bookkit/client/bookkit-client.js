const { callCommand } = require("../../client/calls");
/**
 * Updates given section on the given page with new uu5String content
 *
 * @param baseUri bookkit base uri
 * @param page page code in the given book
 * @param code section code within the page to be updated
 * @param content uu5String content to be replaced within the whole section
 * @param token authorization token
 */
const updateSection = async (baseUri, page, code, content, token) => {
    let lock = await callCommand(`${baseUri}/lockPageSection`, "POST", { code: code, page: page }, token);
    await callCommand(`${baseUri}/updatePageSection`, "POST", {
        code: code,
        page: page,
        content: content,
        sys: { rev: lock.sys.rev }
    }, token);
    await callCommand(`${baseUri}/unlockPageSection`, "POST", { code: code, page: page }, token);
}

// TODO implement fileUpload to bookkit
// TODO implement createSection with new content

module.exports = {
    updateSection

}