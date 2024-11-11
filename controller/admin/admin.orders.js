import Orders from "../../models/admin/order.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find({})
      .populate("user")
      .populate({
        path: "items.dish",
      })
      .populate("items.modifiers")
      .sort({ created_at: -1 });

    console.log(orders);

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllOrders };
