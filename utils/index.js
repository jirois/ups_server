import { createJWT, isTokenValid, attachCookiesToResponse } from "./jwt";
import createTokenUser from './createTokenUser';
import checkPermissions from './checkPermissions';
import sendVerificationEmail from './sendResetPasswordEmail';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import createHash from './createHash';

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