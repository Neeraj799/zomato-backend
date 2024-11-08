import Modifiers from "../../models/admin/modifiers.js";

const getAllModifiers = async (req, res) => {
  try {
    const modifiers = await Modifiers.find({}).sort({ createdAt: -1 });

    console.log(modifiers);

    return res.status(200).json(modifiers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllModifiers };
