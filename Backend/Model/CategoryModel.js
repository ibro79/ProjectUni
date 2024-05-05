import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    Category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", CategorySchema);
