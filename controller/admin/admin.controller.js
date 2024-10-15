import Submissions from "../../models/admin/submission.js";

const getAlldishes = async (req, res) => {
  try {
    const dishes = await Submissions.find({}).sort({ createdAt: -1 });

    console.log(dishes);

    return res.status(200).json(dishes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDish = async (req, res) => {
  const { title, description, price, category, modifiers } = req.body;

  try {
    const dish = new Submissions({
      title,
      description,
      price,
      category,
      modifiers,
    });

    let data = await dish.save();

    return res.status(200).json({
      success: true,
      message: "Dish created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDish = async (req, res) => {
  const { id } = req.params;

  const dish = await Submissions.findById(id);

  if (!dish) {
    return res.status(404).json({ error: "No such dish available" });
  }

  return res.status(200).json(dish);
};

const deleteDish = async (req, res) => {
  const { id } = req.params;

  const dish = await Submissions.findByIdAndDelete({ _id: id });

  if (!dish) {
    return res.status(404).json({ error: "No such dish available" });
  }
  return res.status(200).json(dish);
};

const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const updatedData = {
      title,
      description,
      price,
    };

    const updatedDish = await Submissions.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      { new: true }
    );

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Dish updated successfully",
      submission: updatedDish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createDish, getAlldishes, getDish, deleteDish, updateDish };
