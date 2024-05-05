import express from "express";
import { Inventura2 } from "../Model/InventModel2.js";
import { Shops } from "../Model/ShopsModel.js";

const router = express.Router();

// POST route to create new inventory items
router.post("/", async (request, response) => {
  try {
    if (!request.body.Sku || !request.body.Brand || !request.body.Price || !request.body.Quantity || !request.body.Category ) {
      return response.status(400).send({
        message: "Please fill in all fields",
      });
    }

    // Check if the shop name exists
    const shop = await Shops.findOne({ ShopName: request.body.ShopName });
    if (!shop) {
      return response.status(400).send({
        message: "Invalid ShopName",
      });
    }

    // Calculate the TotalQuantity
    const TotalQuantity = (request.body.Quantity || 0) - (request.body.Sales || 0);

    const NewInventory = {
      Sku: request.body.Sku,
      Brand: request.body.Brand,
      Price: request.body.Price,
      Quantity: request.body.Quantity,
      Category: request.body.Category,
      ShopName: request.body.ShopName,
      TotalQuantity: TotalQuantity,
      SalesInTotal: request.body.Sales || 0,
      CreatedTime: request.body.CreatedTime,
    };

    const newinventura = await Inventura2.create(NewInventory);

    return response.status(201).send(newinventura);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route to fetch inventory items
router.get("/", async (request, response) => {
  try {
    const { shop } = request.query;
    const filter = shop ? { ShopName: shop } : {}; // Apply filter if shop parameter is provided

    const inventura = await Inventura2.find(filter);

    return response.status(200).json({
      count: inventura.length,
      data: inventura,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// GET route to fetch inventory items
router.get("/filterbytime", async (request, response) => {
  try {
    const { Time } = request.query;
    const filter =  { CreatedTime: Time }; // Apply filter if shop parameter is provided

    const inventura = await Inventura2.find(filter);

    return response.status(200).json({
      count: inventura.length,
      data: inventura,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route to fetch inventory item by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const inventura = await Inventura2.findById(id);

    return response.status(200).json(inventura);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// PUT route to update inventory item
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
      newSalesInTotal += currentSales; // Adjust total sales
      newTotalQuantity -= currentSales; // Deduct sales from total quantity
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

// DELETE route to delete inventory item
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Inventura2.findByIdAndDelete(id);

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
