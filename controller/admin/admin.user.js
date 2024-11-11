import User from "../../models/admin/user.js";

const getAllUsers = async (req, res) => {
  try {
    const dishes = await User.find({}).sort({ created_at: -1 });

    return res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllUsers };
