import express from "express";
import { Inventura } from "../Model/InventModel.js";
import { Inventura2 } from "../Model/InventModel2.js";

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const inventura1Data = await Inventura.find({});
        const inventura2Data = await Inventura2.find({});

        const combinedData = {
            Inventura: inventura1Data,
            Inventura2: inventura2Data
        };

        return response.status(200).json({
            count: {
                Inventura: inventura1Data.length,
                Inventura2: inventura2Data.length
            },
            data: combinedData,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
