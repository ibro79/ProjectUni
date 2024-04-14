import express from "express";
import { Inventura } from "../Model/InventModel.js";

const router = express.Router();
   

router.post("/", async (request, response) => {
  try {
    if (!request.body.Sku || !request.body.Brand || !request.body.Price || !request.body.Quantity || !request.body.Category) {
      return response.status(400).send({
        message: "Please fill in all fields",
      });
    }
    const NewInventory = {
      Sku: request.body.Sku,
      Brand: request.body.Brand,
      Price: request.body.Price,
      Quantity: request.body.Quantity,
      Category: request.body.Category,
    };

    const newinventura = await Inventura.create(NewInventory);

    return response.status(201).send(newinventura);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//zde ziskama vsechny inventury
router.get("/", async (request, response) => {
  try {
    const inventura = await Inventura.find({});

    return response.status(200).json({
      count: inventura.length,
      data: inventura,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//zde ziskame inventuru podle ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const inventura = await Inventura.find({});

    return response.status(200).json(inventura);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//routa pro aktualizaci inventury
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.Sku || !request.body.Brand || !request.body.Price || !request.body.Quantity || !request.body.Category) {
      return response.status(400).send({
        message: "Please fill in all fields",
      });
    }
    const { id } = request.params;

    const result = await Inventura.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Product not found" }); 
    }
    return response.status(200).send({ message: "Product updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//routa pro smazani inventury
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Inventura.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Product not found" }); 
    }

    return response.status(200).send({ message: "Product deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;