import { StatusCodes } from "http-status-codes";
import Token from "../models/Token.js";
import User from "../models/User.js";
import {
    attachCookiesToResponse,
    createTokenUser,
    sendVerificationEmail,
    sendResetPasswordEmail,
    createHash
}
    from "../utils/index.js";
import { randomBytes } from 'crypto'
import { BadRequestError, CustomAPIError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
    const { email, name, password } = req.body

    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
        throw new BadRequestError('Email already exists')
    }
    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user'

    const verificationToken = randomBytes(40).toString('hex')

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken
    })

    const origin = 'http://localhost:9000'

    // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app';

    // const tempOrigin = req.get('origin');
    // const protocol = req.protocol;
    // const host = req.get('host');
    // const forwardedHost = req.get('x-forwarded-host');
    // const forwardedProtocol = req.get('x-forwarded-proto');


    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin
    })

    res.status(StatusCodes.CREATED).json({
        msg: 'Success! Please check your email to verify account'
    })
}

const verifyEmail = async (req, res) => {
    const { verificationToken, email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Verification failed')
    }

    if (user.verificationToken !== verificationToken) {
        throw new UnauthenticatedError('Verification Failed')
    }

    (user.isVerified = true), (user.verified = Date.now())
    user.verificationToken = ''

    await user.save()
    res.status(StatusCodes.Ok).json({ msg: 'Email Verified' })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password ')
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    if (!user.isVerified) {
        throw new UnauthenticatedError('Please verify your email')
    }

    const tokenUser = createTokenUser(user)

    // create refresh token
    let refreshToken = ''
    // check for existing token
    const existingToken = await Token.findOne({ user: user._id })

    if (existingToken) {
        const { isValid } = existingToken
        if (!isValid) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        refreshToken = existingToken.refreshToken
        attachCookiesToResponse({ res, user: tokenUser, refreshToken })
        res.status(StatusCodes.Ok).json({ user: tokenUser })
        return
    }

    refreshToken = randomBytes(40).toString('hex')
    const userAgent = req.headers['user-agent']
    const ip = req.ip
    const userToken = { refreshToken, ip, userAgent, user: user._id }

    await Token.create(userToken)

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
    await Token.findOneAndDelete({ user: req.user.userId })

    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.cookies('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' })

}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new BadRequestError('Please provide valid email')
    }
    const user = await User.findOne({ email })

    if (user) {
        const passwordToken = randomBytes(70).toString('hex')
        // send email
        const origin = 'http://localhost:9000'
        await sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin
        })
        const tenMinutes = 1000 * 60 * 10
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

        user.passwordToken = createHash(passwordToken)
        user.passwordTokenExpirationDate = passwordTokenExpirationDate
        await user.save()

    }

    res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link' })
}

const resetPassword = async (req, res) => {
    const { token, email, password } = req.body

    if (!token || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email })

    if (user) {
        const currentDate = new Date()

        if (
            user.passwordToken === createHash(token) &&
            user.passwordTokenExpirationDate > currentDate
        ) {
            user.password = password
            user.passwordToken = null
            user.passwordTokenExpirationDate = null
            await user.save()
        }
    }
    res.send('reset password')
}

export {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
}