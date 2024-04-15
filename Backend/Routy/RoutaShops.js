import express from "express";
import { Shops } from "../Model/ShopsModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!request.body.ShopName) {
      return response.status(400).send({
        message: "Please fill in all fields",
      });
    }
    const newShop = {
      ShopName: request.body.ShopName,
    };

    const newShopEntry = await Shops.create(newShop);

    return response.status(201).send(newShopEntry);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const shops = await Shops.find({});

    return response.status(200).json({
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const shop = await Shops.findById(id);

    return response.status(200).json(shop);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (!request.body.ShopName) {
      return response.status(400).send({
        message: "Please fill in all fields",
      });
    }
    const { id } = request.params;

    const result = await Shops.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Shop not found" });
    }
    return response.status(200).send({ message: "Shop updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Shops.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Shop not found" });
    }

    return response.status(200).send({ message: "Shop deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
