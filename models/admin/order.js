import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema(
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
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        modifiers: [
          {
            type: Schema.Types.ObjectId,
            ref: "modifier",
          },
        ],
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Orders = mongoose.model("orders", OrderSchema);

export default Orders;
