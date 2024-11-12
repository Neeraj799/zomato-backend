import mongoose, { Schema } from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    actualPrice: {
      type: Number,
    },

    image: {
      type: [String],
    },

    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],

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

const Submissions = mongoose.model("submission", SubmissionSchema);

export default Submissions;
