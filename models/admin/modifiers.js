import mongoose from "mongoose";

const modifierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
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

const Modifiers = mongoose.model("modifier", modifierSchema);

export default Modifiers;
