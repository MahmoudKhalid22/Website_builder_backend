import Joi from "joi";

const createUserValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .when("facebookId", {
      is: Joi.exist().not(null),
      then: Joi.forbidden(),
      otherwise: Joi.string().email().required(),
    }),

  googleId: Joi.string().allow(null),
  facebookId: Joi.string().allow(null),

  password: Joi.string()
    .min(6)
    .when("googleId", {
      is: Joi.exist().not(null),
      then: Joi.forbidden(),
      otherwise: Joi.when("facebookdId", {
        is: Joi.exist().not(null),
        then: Joi.forbidden(),
        otherwise: Joi.required(),
      }),
    }),

  verified: Joi.boolean().default(false),
  //   avatar: Joi.
}).xor("password", "googleId", "facebookId");

const loginValidation = Joi.object({
  email: Joi.string().email(),
});

const forgetPasswordValication = Joi.object({
  email: Joi.string().email(),
});

const resetPasswordValidation = Joi.object({
  token: Joi.string(),
  newPassword: Joi.string().min(6),
});

const tokenValidation = Joi.object({
  token: Joi.string(),
});

const nameValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export {
  createUserValidation,
  loginValidation,
  forgetPasswordValication,
  resetPasswordValidation,
  tokenValidation,
  nameValidation,
};