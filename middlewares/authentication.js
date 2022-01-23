import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js'
import { isTokenValid } from '../utils/index.js'
import Token from '../models/Token.js'
import { attachCookiesToResponse } from '../utils/index.js'

const authenticateUser = async (req, res, next) => {
    const { refreshToken, accesssToken } = req.signedCookies

    try {
        if (accesssToken) {
            const payload = isTokenValid(accessToken)
            req.user = payload.user
            return next()
        }
        const payload = isTokenValid(refreshToken)

        const existingToken = await Token.findOne({
            user: payload.user.userId,
            refreshToken: payload.refreshToken
        })

        if (!existingToken || !existingToken?.isValid) {
            throw new UnauthenticatedError("Authentication valid")
        }

        attachCookiesToResponse({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken
        })

        req.user = payload.user
        next()

    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError(
                'Unathorized to access this route'
            )
        }
        next()
    }
}

export {
    authenticateUser,
    authorizePermissions
}