const sgMail = require('@sendgrid/mail')
const sendgridApiKey = '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'

// Further  optimisation needed: Hide the API KEY in secret file

sgMail.setApiKey(sendgridApiKey);
const msg = {
    to: 'vikaschhillar786@gmail.com',
    from: 'vikaschhillar786@gmail.com',
    subject: 'Weather App Error',
    text: 'Node.js App',
    html: '<strong>Something went wrong on the Application.</strong>',
};
const sendErrorEmailToAdmin = sgMail.send(msg)

module.exports = sendErrorEmailToAdmin

