import React, { useState } from "react";
import axios from "axios";

const Report = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [shop, setShop] = useState("");
  const [inventoryData, setInventoryData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/inventory", {
        params: { shop, fromDate, toDate },
      });
      setInventoryData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Inventory Report</h2>
      <div>
        <label htmlFor="fromDate">From:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label htmlFor="toDate">To:</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <label htmlFor="shop">Shop:</label>
        <input
          type="text"
          id="shop"
          value={shop}
          onChange={(e) => setShop(e.target.value)}
        />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <div>
        <h3>Inventory Items</h3>
        <ul>
          {inventoryData.map((item) => (
            <li key={item._id}>
              SKU: {item.Sku}, Brand: {item.Brand}, Price: {item.Price}, Quantity: {item.Quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
