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
  role: Joi.string().valid("user", "admin", "premium").default("user"),
  //   avatar: Joi.
}).xor("password", "googleId", "facebookId");

const loginValidation = Joi.object({
  email: Joi.string().email().when("facebookId", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  password: Joi.string()
    .min(6)
    .when("googleId", {
      is: Joi.exist().not(null),
      then: Joi.optional(),
      otherwise: Joi.when("facebookId", {
        is: Joi.exist().not(null),
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    }),
});

const forgetPasswordValication = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordValidation = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const tokenValidation = Joi.object({
  token: Joi.string().required(),
});

const nameValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

const updatePasswordValidation = Joi.object({
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

const emailValidation = Joi.object({
  newEmail: Joi.string().email().required(),
});

export {
  createUserValidation,
  loginValidation,
  forgetPasswordValication,
  resetPasswordValidation,
  tokenValidation,
  nameValidation,
  updatePasswordValidation,
  emailValidation,
};
