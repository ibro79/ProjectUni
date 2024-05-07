import express from "express";
import { Inventura2 } from "../Model/InventModel2.js";
import { Shops } from "../Model/ShopsModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const shop = await Shops.findOne({ ShopName: request.body.ShopName });
    if (!shop) {
      return response.status(400).send({
        message: "Invalid ShopName",
      });
    }
  
    const newInventory = await Inventura2.create(request.body);
    return response.status(201).json(newInventory);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const { shop, startDate, endDate } = request.query;
    let filter = {}; 

    
    if (shop) {
      filter.ShopName = shop;
    }

 
    if (startDate && endDate) {
      filter.CreatedTime = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

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

router.get("/report/:date", async (request, response) => {
  try {
    const { date } = request.params;
    const selectedDate = new Date(date);

   
    const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const endOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1);

    const inventura = await Inventura2.find({
      CreatedTime: { $gte: startOfDay, $lt: endOfDay } 
    }).sort({ Sku: 1 }); 

    return response.status(200).json({
      count: inventura.length,
      data: inventura,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

  
    const inventoryItem = await Inventura2.findById(id);
    if (!inventoryItem) {
      return response.status(404).json({ message: "Product not found" });
    }

 
    let newTotalQuantity = inventoryItem.TotalQuantity;
    if (request.body.Quantity !== undefined) {
      if (isNaN(Number(request.body.Quantity))) {
        return response.status(400).json({ message: "Invalid Quantity value" });
      }
      const newQuantity = Number(request.body.Quantity);
      newTotalQuantity += newQuantity; 
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
