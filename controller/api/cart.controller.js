import Cart from "../../models/admin/cart.js";
import Orders from "../../models/admin/order.js";

const getAllCartItems = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.dish",
        model: "submission",
      })
      .populate({
        path: "items.modifiers",
        model: "modifier",
      });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { dishId, modifierIds, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ dish: dishId, modifiers: modifierIds, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) =>
          item.dish.toString() === dishId.toString() &&
          JSON.stringify(item.modifiers) === JSON.stringify(modifierIds)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ dish: dishId, modifiers: modifierIds, quantity });
      }
    }

    await cart.save();

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
  const userId = req.userId;
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the item with the given itemId
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

const updateItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.params;
    const { modifierIds, quantity } = req.body;

    console.log("userId", userId);

    const modifiers = Array.isArray(modifierIds) ? modifierIds : [];

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the item with the given itemId
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items[itemIndex].modifiers = modifiers;
    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkout = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      items,
      totalAmount,
      fullName,
      mobile,
      address,
      city,
      state,
      pincode,
    } = req.body;

    console.log("data", req.body);

    const newOrder = new Orders({
      user: userId,
      items,
      totalAmount,
      fullName,
      mobile,
      address,
      city,
      state,
      pincode,
      status: "PENDING",
    });

    const data = await newOrder.save();
    console.log(data);

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addToCart, getAllCartItems, deleteItem, updateItem, checkout };
