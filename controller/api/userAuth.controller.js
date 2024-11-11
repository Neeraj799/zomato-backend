import bcrypt from "bcrypt";
import { imageUploadHelper } from "../../helpers/imageKit.helper.js";
import createToken from "../../utils/createtoken.js";
import User from "../../models/admin/user.js";
import { signInSchema, signUpSchema } from "../../utils/validationSchema.js";

const signUp = async (req, res) => {
  console.log("hello");

  try {
    const { error } = signUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);

      return res.status(403).json({ error: error.details });
    }

    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const error = {
        details: [
          {
            message: "User already registered here",
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

    const folder = "User";
    let uploadFile;
    if (req.files) {
      uploadFile = await imageUploadHelper(req.files, folder, "user");
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (uploadFile) {
      newUser.image = uploadFile;
    }

    let data = await newUser.save();

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
    let user = await User.findOne({ email });
    if (user) {
      const userValid = bcrypt.compareSync(password, user.password);
      if (!userValid) {
        return res.status(401).json({ error: "Invalid password" });
      } else {
        const token = createToken(user._id);
        return res
          .setHeader("authorization", `Bearer ${token}`)
          .status(200)
          .json({
            success: true,
            message: "User logged in successfully",
            token: token ? `Bearer ${token}` : undefined,
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { signUp, signIn };
