const { body, param } = require('express-validator');

const registerValidator = [
    body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
body('email')
    .isEmail().withMessage('Must be valid email addres')
    .notEmpty().withMessage('Email is required'),
body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6}).withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
    body('email')
        .isEmail().withMessage('Must be a valid email addres')
        .notEmpty().withMessage('Email is required'),
    body('password')
            .notEmpty().withMessage('Password is required'),        
];

const userIdValidation =[
    param('id')
    .isMongoId().withMessage('Invalid user ID format'),
];

module.exports = {
    registerValidator,
    loginValidation,
    userIdValidation,
};