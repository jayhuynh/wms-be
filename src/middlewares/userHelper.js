const { body, query } = require('express-validator');

exports.validateCreateUser = () => {
    return [
        body('email', 'Email can not be empty').not().isEmpty(),

        body('email', 'Invalid email').isEmail({
            //not allow non english character
            allow_utf8_local_part: false,
            //check for standard max length of an email
            ignore_max_length: false,
            //disallowing certain syntactically valid email addresses that are rejected by Gmail
            domain_specific_validation: true
            //canonicalizes an email address
        }).normalizeEmail(),

        body('password', 'Password can not be empty').not().isEmpty(),

        body('password', 'Password must from 8 to 100 characters').isLength({
            min: 8,
            max: 100
        }),

        body('role', 'Role can not be empty').not().isEmpty(),

        body('role', 'Role can not exceed 50 characters').isLength({
            max: 50
        }),

        body('fullName').optional()
    ]
};

exports.validateGetUser = () => {
    return [
        query('limit', 'Limit must be an integer').optional({ null: true }).isInt().toInt(),
        query('offset', 'Offset must be an integer').optional({ null: true }).isInt().toInt(),
    ]
};