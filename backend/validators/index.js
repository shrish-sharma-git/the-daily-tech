const {validationResult} = require('express-validator');

// STATUS 422 = Unprocessable Entity

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({error: errors.array()[0].msg });
    }
    next(); 
}