import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required().max(60),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .doesNotInclude(["password"])
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required().max(60),
  password: joiPassword.string().required(),
});

export { signUpSchema, signInSchema };
