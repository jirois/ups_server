import { createTransport } from 'nodemailer'
import { configNodemailer, configNodemailerAuth } from './nodemailerConfig.js'


const sendEmail = async ({ to, subject, html }) => {
    const transporter = createTransport(configNodemailerAuth)
    return transporter.sendMail({
        from: '"Uptha Co" <upthaco@info.com>',
        to,
        subject,
        html
    })
}

export default sendEmail