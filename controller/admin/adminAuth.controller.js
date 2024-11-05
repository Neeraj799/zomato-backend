import bcrypt from "bcrypt";
import Admin from "../../models/admin/admin.js";
import createToken from "../../utils/createtoken.js";
import { signInSchema, signUpSchema } from "../../utils/validationSchema.js";
import { imageUploadHelper } from "../../helpers/imageKit.helper.js";

const signUp = async (req, res) => {
  try {
    const { error } = signUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(403).json({ error: error.details });
    }

    const { username, email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin) {
      const error = {
        details: [
          {
            message: "Admin already registered here",
            type: "any.unique",
            context: {
              label: "email",
              key: "email",
            },
          },
        ],
      };
      return res.status(403).json({ error: error.details[0].message });
    }

    const salt = bcrypt.genSaltSync(10);

    let hashedPassword = bcrypt.hashSync(password, salt);

    const folder = "Admin";
    let uploadFile;
    if (req.files) {
      uploadFile = await imageUploadHelper(req.files, folder, "admin");
    }

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    if (uploadFile) {
      newAdmin.image = uploadFile;
    }

    let data = await newAdmin.save();

    return res
      .status(201)
      .json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

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

export { signIn, signUp };
