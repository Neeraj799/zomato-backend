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

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (
      ![
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid status" });
    }

    order.status = status;

    const data = await order.save();
    console.log(data);

    return res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllOrders, updateOrderStatus };
