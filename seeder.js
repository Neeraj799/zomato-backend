import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "./models/admin/admin.js";

const runSeeder = async () => {
  // DB Connection
  await mongoose
    .connect(process.env.DB_CONNECTION, {
      dbName: `${process.env.DB_NAME}`,
    })
    .then(() => {
      console.log("DB Connected");
    });
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  await adminSeeder();
  //   await userSeeder();
  //   await submissionSeeder();
  console.log("Seeder run success");
};

runSeeder();

const adminSeeder = async () => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const admin = {
      name: "Admin",
      email: "admin@gmail.com",
      password: await bcrypt.hashSync("password", salt),
    };

    const admin_exist = await Admin.findOne({
      email: admin.email,
    });
    if (!admin_exist) {
      await Admin.create({
        name: admin.name,
        email: admin.email,
        password: admin.password,
      });
    } else {
      admin_exist.name = admin.name;
      admin_exist.email = admin.email;
      admin_exist.password = admin.password;
      await admin_exist.save();
    }
    console.log("✅ Admin Seeder");
  } catch (error) {
    console.log(`❗️ admin Seeder Error | ${error}`);
  }
};
