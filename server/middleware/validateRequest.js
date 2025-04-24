export const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
// This middleware function validates the request body against a given schema using Joi. If the validation fails, it sends a 400 response with the error message. If it passes, it calls the next middleware or route handler.
// It is used to ensure that the incoming data meets the expected format and constraints before processing it further in the application.
// This is particularly useful for APIs to maintain data integrity and provide clear error messages to clients when they send invalid data.
// The function takes a schema as an argument and returns a middleware function that can be used in Express routes. It uses Joi's validate method to check the request body against the schema. If validation fails, it sends a 400 response with the error message; if it passes, it calls the next middleware or route handler.