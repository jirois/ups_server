const configNodemailer = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kailey.beahan24@ethereal.email',
        pass: 'j1cDsKqR9ycxjxsK9V'
    }
}

const configNodemailerGmail = {
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
}

const configNodemailerAuth = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'jinncyapps@gmail.com',
        clientId: '365220036260-aj1hle8faa48cbu8bd4o2hcshhululbi.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04tpjRUY1yTYmCgYIARAAGAQSNwF-L9Ir6U5ZnX-yo22pfiVWPHrn5VHcnxMEHzWdqL9HEG3Cht1bzyTm_kn-o5d1MQVUBNvU1k4',
        accessToken: 'ya29.A0ARrdaM-hT_-bok-EpTv9Vr5fNqY-aBPk2NWy0P0GRaGfB2C0VcaV4OaKOzUcqSTp13l529nKIOCbxn32Nwy9ME9mh1AMTzJcWSyyfZcTgfynLjsZkyyqm1Lr1aHLl-HlnfqAYcFUCYlIrSCGqdoMr10Vjyfb'
    }
}
export {
    configNodemailer,
    configNodemailerGmail,
    configNodemailerAuth
}