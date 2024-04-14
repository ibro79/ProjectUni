import express from "express";
import { Inventura2 } from "../Model/InventModel2.js";

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

    const newinventura = await Inventura2.create(NewInventory);

    return response.status(201).send(newinventura);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//zde ziskame vsechny inventury
router.get("/", async (request, response) => {
  try {
    const inventura = await Inventura2.find({});

    return response.status(200).json({
      count: Inventura2.length,
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

    const inventura = await Inventura2.find({});

    return response.status(200).json(inventura);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//routa pro aktualizaci inventury
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Retrieve the current inventory item
    const inventoryItem = await Inventura2.findById(id);
    if (!inventoryItem) {
      return response.status(404).json({ message: "Product not found" });
    }

    // Calculate the new total quantity
    let newTotalQuantity = inventoryItem.TotalQuantity;
    if (request.body.Quantity !== undefined) {
      if (isNaN(Number(request.body.Quantity))) {
        return response.status(400).json({ message: "Invalid Quantity value" });
      }
      const newQuantity = Number(request.body.Quantity);
      newTotalQuantity += newQuantity; // Adjust total quantity
    }

    // Calculate the new total sales
    let newSalesInTotal = inventoryItem.SalesInTotal;
    if (request.body.Sales !== undefined) {
      if (isNaN(Number(request.body.Sales))) {
        return response.status(400).json({ message: "Invalid Sales value" });
      }
      const currentSales = Number(request.body.Sales);
      newSalesInTotal += currentSales; 
      newTotalQuantity -= currentSales; 
      if (newTotalQuantity < 0) {
        return response.status(400).json({ message: "Sales cannot exceed TotalQuantity" });
      }
    }

    // Update the inventory item with new total quantity and total sales
    const result = await Inventura2.findByIdAndUpdate(
      id,
      { ...request.body, TotalQuantity: newTotalQuantity, SalesInTotal: newSalesInTotal },
      { new: true }
    );

    return response.status(200).send({ message: "Product updated", updatedProduct: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



//routa pro smazani inventury
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Inventura2.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Product not found" }); //nefunkcni
    }

    return response.status(200).send({ message: "Product deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;