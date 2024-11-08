import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    dish: {
      type: Schema.Types.ObjectId,
      ref: "submission",
    },

    modifiers: [
      {
        type: Schema.Types.ObjectId,
        ref: "modifier",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Cart = mongoose.model("cart", CartSchema);

export default Cart;
