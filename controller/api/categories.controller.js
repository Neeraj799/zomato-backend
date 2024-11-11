import Category from "../../models/admin/category.js";
import Submissions from "../../models/admin/submission.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    console.log(categories);

    return res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "No such category" });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSortedDishes = async (req, res) => {
  const { categoryId, sortOrder } = req.params;

  try {
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const dishes = await Submissions.find({ category: categoryId }).sort({
      price: sortDirection,
    });

    if (dishes.length === 0) {
      return res
        .status(404)
        .json({ message: "No dishes found in this category" });
    }

    res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching sorted dishes:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

export { getAllCategories, getCategory, getSortedDishes };
