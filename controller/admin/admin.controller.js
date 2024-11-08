import mongoose from "mongoose";
import { imageUploadHelper } from "../../helpers/imageKit.helper.js";
import Submissions from "../../models/admin/submission.js";

const getAlldishes = async (req, res) => {
  try {
    const dishes = await Submissions.find({})
      .populate("category")
      .populate("modifiers")
      .sort({ created_at: -1 });

    return res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createDish = async (req, res) => {
  const { title, description, price, actualPrice, category, modifiers } =
    req.body;

  try {
    const folder = "Dishes";
    let uploadFile;

    if (req.files) {
      console.log(req.files);
      uploadFile = await imageUploadHelper(req.files, folder, "dish");
    }

    const newDish = new Submissions({
      title,
      description,
      price,
      actualPrice,
      category,
      modifiers,
    });

    if (uploadFile) {
      newDish.image = uploadFile;
    }

    let data = await newDish.save();

    return res.status(200).json({
      success: true,
      message: "Dish created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDish = async (req, res) => {
  try {
    const { id } = req.params;

    const dish = await Submissions.findById(id);

    if (!dish) {
      return res.status(404).json({ error: "No such dish available" });
    }

    return res.status(200).json(dish);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;

    const dish = await Submissions.findByIdAndDelete({ _id: id });

    if (!dish) {
      return res.status(404).json({ error: "No such dish available" });
    }
    return res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateDish = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, price, category, modifiers, image } = req.body;

    const folder = "Dishes";
    let uploadFile;
    if (req.files) {
      uploadFile = await imageUploadHelper(req.files, folder, "dish");
    }

    const filteredModifiers = (modifiers || [])
      .filter((id) => id && id !== "undefined")
      .filter((id) => mongoose.Types.ObjectId.isValid(id));

    const updatedData = {
      title,
      description,
      price,
      category,
      modifiers: filteredModifiers,
      image: uploadFile || image,
    };

    if (uploadFile) {
      updatedData.image = uploadFile;
    }

    const updatedDish = await Submissions.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      { new: true }
    );

    if (!updatedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    console.log(updatedDish);

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
