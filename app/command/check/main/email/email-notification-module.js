const nodemailer = require("nodemailer");
const {CONSOLE_LOG} = require("../../../../logger/logger");
const {buildEmailHtmlContent} = require("./template/email-html-content-builder");

const sendEmailNotification = async (cmdArgs, configuration, groupedResults) => {
    const emailContent = buildEmailHtmlContent({results: groupedResults, uuApp: configuration.uuApp.name});
    let transporter = nodemailer.createTransport(configuration.email.transportsConfiguration);
    await _sendEmailForRecipients(cmdArgs, configuration, emailContent, transporter);
}

const _sendEmailForRecipients = async (cmdArgs, configuration, emailContent, transporter) => {
    for (const recipient of configuration.email.recipients) {
        CONSOLE_LOG.info(`Sending email notification to recipient: ${recipient}`);
        let info = await transporter.sendMail({
            from: '"sls-tools notification 👀" <noreply@sls-tools.com>',
            to: recipient,
            subject: `Check Report for ${configuration.uuApp.name} uuApp.`,
            html: emailContent
        });
        CONSOLE_LOG.info(`Email sent to ${recipient} - ID: ${info.messageId}`);
    }
}

module.exports = {
    sendEmailNotification
}