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
    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
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
