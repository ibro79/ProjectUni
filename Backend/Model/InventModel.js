import mongoose from "mongoose";

const inventSchema = mongoose.Schema(
  {
    Sku: {
      type: String,
      required: true,
    },
    Brand: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      enum: ["Suitcases", "HandBags, Wallets, "], // Defining enum options
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Inventura = mongoose.model("Inventura", inventSchema);
