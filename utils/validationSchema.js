import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const signInSchema = Joi.object({
  email: Joi.string().email().required().max(60),
  password: joiPassword.string().required(),
});

export { signInSchema };
