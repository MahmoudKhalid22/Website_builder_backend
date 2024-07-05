import sanitizeHtml from "sanitize-html";
import {
  createUserValidation,
  loginValidation,
  forgetPasswordValication,
  resetPasswordValidation,
  tokenValidation,
  nameValidation,
  updatePasswordValidation,
  emailValidation,
} from "./user.model.validation.js"; // Adjusted import path

const sanitizeInput = (input) => {
  return sanitizeHtml(input);
};

const validateAndSanitize = (schema) => {
  return (req, res, next) => {
    // Sanitize input
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = sanitizeInput(req.body[key]);
      }
    }

    // Validate input
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    next();
  };
};

export const validateCreateUser = validateAndSanitize(createUserValidation);
export const validateLogin = validateAndSanitize(loginValidation);
export const validateForgetPassword = validateAndSanitize(
  forgetPasswordValication
);
export const validateResetPassword = validateAndSanitize(
  resetPasswordValidation
);
export const validateToken = validateAndSanitize(tokenValidation);
export const validateName = validateAndSanitize(nameValidation);
export const validateUpdatePassword = validateAndSanitize(
  updatePasswordValidation
);
export const validateEmail = validateAndSanitize(emailValidation);
