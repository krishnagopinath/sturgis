exports.ERRORS = {
    INVALID_USER: {
        code: 'INVALID_USER',
        message: 'Failed to authenticate user',
    },
    NO_ACCESS: {
        code: 'NO_ACCESS',
        message: 'You are not authorized to perform this action',
    },
    BAD_LOGIN: {
        code: 'BAD_LOGIN',
        message: 'Incorrect credentials',
    },
}

exports.USER_ROLES = {
    LIBRARIAN: 'librarian',
    MEMBER: 'member',
}
