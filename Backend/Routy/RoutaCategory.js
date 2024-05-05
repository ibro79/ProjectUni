import express from "express";
import { Category } from "../Model/CategoryModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!request.body.Category) {
      return response.status(400).send({
        message: "Please fill in all fields",
      });
    }
    const newCategory = {
      Category: request.body.Category,
    };

    const newCategoryEntry = await Category.create(newCategory);

    return response.status(201).send(newCategoryEntry);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const categories = await Category.find({});

    return response.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const category = await Category.findById(id);

    return response.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (!request.body.Category) {
      return response.status(400).send({
        message: "Please fill in all fields",
      });
    }
    const { id } = request.params;

    const result = await Category.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Category not found" });
    }
    return response.status(200).send({ message: "Category updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Category not found" });
    }

    return response.status(200).send({ message: "Category deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
