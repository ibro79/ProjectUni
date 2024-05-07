import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const url = `http://localhost:5555/inventory/report/${selectedDate}`;
      console.log("Request URL:", url); // Log the request URL
      axios.get(url)
        .then((response) => {
          console.log("Response Data:", response.data); // Log the response data
          setReportData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error:", error); // Log any errors
          setLoading(false);
        });
    }
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-8'>Inventory Report</h1>
      <div>
        <label htmlFor='dateFilter' className='mr-2'>Select Date:</label>
        <input type='date' id='dateFilter' value={selectedDate} onChange={handleDateChange} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th>Sku</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quantity</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={item._id}>
                <td>{item.Sku}</td>
                <td>{item.Brand}</td>
                <td>{item.Price}</td>
                <td>{item.Quantity}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Report;
