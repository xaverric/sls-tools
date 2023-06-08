const nodemailer = require("nodemailer");
const {CONSOLE_LOG} = require("../../../../logger/logger");
const {readTextFile} = require("../../../../utils/fs-helper");

const sendEmailNotification = async (cmdArgs, configuration, htmlContentPath) => {
    const emailContent = readTextFile(htmlContentPath)
    let transporter = nodemailer.createTransport(configuration.email.transportsConfiguration);
    await _sendEmailForRecipients(cmdArgs, configuration, emailContent, transporter);
}

const _sendEmailForRecipients = async (cmdArgs, configuration, emailContent, transporter) => {
    for (const recipient of configuration.email.recipients) {
        CONSOLE_LOG.info(`Sending email notification to recipient: ${recipient}`);
        let info = await transporter.sendMail({
            from: '"sls-tools notification 👀" <noreply@sls-tools.com>',
            to: recipient,
            subject: `Comparison for ${configuration.uuApp.name} (${configuration.uuApp.shortName}) uuApp.`,
            html: emailContent
        });
        CONSOLE_LOG.info(`Email sent to ${recipient} - ID: ${info.messageId}`);
    }
}

module.exports = {
    sendEmailNotification
}