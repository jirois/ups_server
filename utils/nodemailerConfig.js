const configNodemailer = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kailey.beahan24@ethereal.email',
        pass: 'j1cDsKqR9ycxjxsK9V'
    }
}

const configNodemailerGmail = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
}

export {
    configNodemailer,
    configNodemailerGmail
}