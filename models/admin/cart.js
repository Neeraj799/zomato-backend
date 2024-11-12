import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    items: [
      {
        dish: {
          type: Schema.Types.ObjectId,
          ref: "submission",
        },

        modifiers: [
          {
            modifier: {
              type: Schema.Types.ObjectId,
              ref: "modifier",
            },
            quantity: {
              type: Number,
              required: true,
              default: 1,
            },
          },
        ],
        quantity: {
          type: Number,
          required: true,
        },
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
