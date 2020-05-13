const {
    body,
    validationResult
} = require('express-validator')

const userValidationRules = () => {
    return [
        // password must be at least 6 chars long
        body('password').isLength({
            min: 6
        }),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.param]: 'must be at least 6  chars long'
    }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate,
}