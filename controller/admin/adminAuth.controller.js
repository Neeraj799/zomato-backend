import bcrypt from "bcrypt";
import Admin from "../../models/admin/admin.js";
import createToken from "../../utils/createtoken.js";
import { signInSchema } from "../../utils/validationSchema.js";

const signIn = async (req, res) => {
  try {
    //BEGIN::Joi validation
    const { error } = signInSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(422).json({ error: error.details[0] });
    }
    //END::Joi validation

    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) {
      const adminValid = bcrypt.compareSync(password, admin.password);
      if (!adminValid) {
        return res.status(401).json({ error: "Invalid password" });
      } else {
        const token = createToken(admin._id);
        return res
          .setHeader("authorization", `Bearer ${token}`)
          .status(200)
          .json({
            success: true,
            message: "Admin logged in successfully",
            token: token ? `Bearer ${token}` : undefined,
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { signIn };
