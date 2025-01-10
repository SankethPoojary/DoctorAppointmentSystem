const { check } = require('express-validator');


exports.adminSignupValidator = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),
   
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
];