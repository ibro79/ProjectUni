import mongoose from "mongoose";

const inventSchema2 = mongoose.Schema(
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
      enum: ["Suitcases", "HandBags", "Wallets", "Backpacks", "Accessories"], 
      required: true,
    },
    Sales: {
      type: Number,
      default: 0, 
    },
    SalesInTotal: {
      type: Number,
      default: 0, 
    },
    TotalQuantity: {
      type: Number,
      default: 0, 
    },
    ShopName: { type: String, required: true }, // Add ShopName
  },
  {
    timestamps: true,
  }
);

export const Inventura2 = mongoose.model("Inventura2", inventSchema2);