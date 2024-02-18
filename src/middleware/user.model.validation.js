import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

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

  password: Joi.string.min(6).when(["googleId", "facebookId"], {
    is: Joi.exist().not(null),
    then: Joi.forbidden(),
    otherwise: Joi.required(),
  }),

  verified: Joi.boolean().default(false),
  //   avatar: Joi.

  googleId: Joi.string().allow(null),
  facebookId: Joi.string().allow(null),
})
  .with("username")
  .xor("password", "googleId", "facebookId");

export default userValidationSchema;
