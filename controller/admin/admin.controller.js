import Submissions from "../../models/admin/submission.js";

const dashboard = async (req, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.error(error);
    return res.redirect("/admin/error/500");
  }
};

const createMenu = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const menu = await Submissions.create({
      title,
      description,
      quantity,
      price,
    });

    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { dashboard, createMenu };
