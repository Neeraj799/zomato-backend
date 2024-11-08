import Cart from "../../models/admin/cart.js";
import Modifiers from "../../models/admin/modifiers.js";
import Submissions from "../../models/admin/submission.js";

const getAllCartItems = async (req, res) => {
  try {
    const items = await Cart.find({})
      .populate("dish")
      .populate("modifiers")
      .sort({ created_at: -1 });

    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { dishId, modifierIds } = req.body;

    const dishes = await Submissions.findById(dishId);

    if (!dishes) {
      return res.status(404).json({ error: "Dishes not found" });
    }

    const modifiers = await Modifiers.find({ _id: { $in: modifierIds } });
    if (!modifiers) {
      return res.status(404).json({ error: "Modifiers not found" });
    }

    const cartItem = new Cart({
      dish: dishes._id,
      modifiers: modifiers.map((mod) => mod._id),
    });

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Cart.findByIdAndDelete({ _id: id });

    if (!item) {
      return res.status(404).json({ error: "No such item found" });
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export { addToCart, getAllCartItems, deleteItem };
