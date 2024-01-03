const Joi = require('joi');
const pick = require('./pick');


const validate = (schema) => async (req, res, next) => {
    try {
        const validSchema = pick(schema, ['params', 'query', 'body']);
        const object = pick(req, Object.keys(validSchema));
        const {
            value,
            error
        } = Joi.compile(validSchema)
            .validate(object);
        console.log(error);
        if (error) {
             return next(
                 error,
            );
        }
        Object.assign(req, value);
        return next();
    } catch (error) {
        console.error(error);
        return next(new ServerError(error, req, res));
    }
};

module.exports = validate;
