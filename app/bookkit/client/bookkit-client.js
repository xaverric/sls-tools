const { callCommand, callFormPostCommand} = require("../../client/calls");
const {CONSOLE_LOG} = require("../../logger/logger");

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
    CONSOLE_LOG.info(`Visualization stored to ${baseUri}/book/page?code=${page}`);
}

/**
 * Creates a new section within given page. Section is added to the top of the page.
 *
 * @param baseUri bookkit base uri
 * @param page page code in the given book
 * @param content uu5String content to be used within the whole section
 * @param token authorization token
 * @returns {Promise<void>}
 */
const createSection = async (baseUri, page, content, token) => {
    await callCommand(`${baseUri}/addPageSection`, "POST", {
        page: page,
        content: content,
        order: 0
    }, token);
}

const uploadFile = async (baseUri, data, token) => {
    return await callFormPostCommand(`${baseUri}/createBinary`, data, token);
}

module.exports = {
    updateSection,
    createSection,
    uploadFile

}