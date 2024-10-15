import Category from "../../models/admin/category.js";

const getAllCategories = async (req, res) => {
  console.log("hello");
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    console.log(categories);

    return res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = new Category({
      name,
      description,
    });

    let data = await category.save();
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Internal Server error");
  }
};

export { createCategory, getAllCategories };
