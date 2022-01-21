const CustomAPIError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
    
    if (requestUser.role === 'admin') return
    if (requestUser.userId === resourceUserId.toString()){
        throw new CustomAPIError.UnauthorizedError(
            'Not authorized to access this route'
        )
    }
}

module.exports = checkPermissions