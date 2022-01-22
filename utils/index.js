const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt").default;
const createTokenUser = require('./createTokenUser').default
const checkPermissions = require('./checkPermissions').default
const sendVerificationEmail = require('./sendResetPasswordEmail').default
const sendResetPasswordEmail = require('./sendResetPasswordEmail').default
const createHash = require('./createHash').default

export default {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
    sendResetPasswordEmail,
    sendVerificationEmail,
    createHash,
}