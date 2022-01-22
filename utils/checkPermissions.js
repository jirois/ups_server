import { UnauthorizedError } from "../errors";

const checkPermissions = (requestUser, resourceUserId) => {
    
    if (requestUser.role === 'admin') return
    if (requestUser.userId === resourceUserId.toString()){
        throw new UnauthorizedError(
            'Not authorized to access this route'
        )
    }
}

export default checkPermissions