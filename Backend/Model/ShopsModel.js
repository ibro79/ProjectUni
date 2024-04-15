import mongoose from "mongoose";

const shopsSchema = mongoose.Schema(
  {
    ShopName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Shops = mongoose.model("Shops", shopsSchema);
