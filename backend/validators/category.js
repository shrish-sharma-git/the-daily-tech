const {check} = require('express-validator');

exports.categoryCeateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),   
];