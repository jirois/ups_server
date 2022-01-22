import { sign, verify } from 'jsonwebtoken'

const createJWT = ({ payload }) => {
    const token = sign(payload, process.env.JWT_SECRET)
    return token
}

const isTokenValid = (token) => verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
    const accessTokenJWT = createJWT({ payload: { user } })
    const refreshToken = createJWT({ payload: { user, refreshToken } })

    const oneDay = 1000 * 60 * 60 * 24
    const longerExp = 1000 * 60 * 60 * 24 * 30

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + oneDay)
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + longerExp)
    })
}

export default {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}