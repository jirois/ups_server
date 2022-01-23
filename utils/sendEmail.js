import { createTransport } from 'nodemailer'
import { nodemailerConfig } from './nodemailerConfig.js'


const sendEmail = async ({ to, subject, html }) => {
    const transporter = createTransport(nodemailerConfig)
    return transporter.sendMail({
        from: '"Uptha Co" <upthaco@info.com>',
        to,
        subject,
        html
    })
}

export default sendEmail