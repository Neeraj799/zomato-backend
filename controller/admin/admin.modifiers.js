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

const createModifier = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newModifier = new Modifiers({
      name,
      price,
    });

    let data = newModifier.save();

    return res.status(200).json({
      success: true,
      message: "Modifier added succesfully",
    });
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

const getModifier = async (req, res) => {
  const { id } = req.params;

  const modifier = await Modifiers.findById(id);

  if (!modifier) {
    return res.status(404).json({ error: "No such modifier found" });
  }

  return res.status(200).json(modifier);
};

const updateModifier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const updateData = {
      name,
      price,
    };

    const updateModifier = await Modifiers.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      { new: true }
    );

    if (!updateModifier) {
      return res.status(404).json({ error: "Modifier not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Modifier updated successfully",
      submission: updateModifier,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteModifier = async (req, res) => {
  try {
    const { id } = req.params;

    const modifier = await Modifiers.findByIdAndDelete({ _id: id });

    if (!modifier) {
      return res.status(404).json({ error: "No such modifier found" });
    }

    return res.status(200).json({ message: "Modifier deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllModifiers,
  createModifier,
  getModifier,
  updateModifier,
  deleteModifier,
};
