import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportData, setReportData] = useState([]);

  const fetchData = async () => {
    try {
      const fromDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0);
      const toDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59);

      const response = await axios.get(`http://localhost:5555/inventory?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`);

      if (Array.isArray(response.data.data)) {
        setReportData(response.data.data);
      } else {
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Inventory Report</h1>
      <div className="flex items-center mb-4">
        <label htmlFor="datePicker" className="mr-4 text-gray-500">Select Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border-2 border-gray-500 px-4 py-2"
        />
      </div>
      <div>
        <h2 className="text-2xl mb-2">Report for {selectedDate.toDateString()}</h2>
        <ul>
          {reportData.map((item, index) => (
            <li key={index} className="border-b-2 border-gray-300 py-2">
              <div>
                <span className="font-bold">SKU:</span> {item.Sku}
              </div>
              <div>
                <span className="font-bold">Brand:</span> {item.Brand}
              </div>
              <div>
                <span className="font-bold">Price:</span> {item.Price}
              </div>
              <div>
                <span className="font-bold">Quantity:</span> {item.Quantity}
              </div>
              <div>
                <span className="font-bold">Sales:</span> {item.Sales}
              </div>
              <div>
                <span className="font-bold">Category:</span> {item.Category}
              </div>
              <div>
                <span className="font-bold">Shop Name:</span> {item.ShopName}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
