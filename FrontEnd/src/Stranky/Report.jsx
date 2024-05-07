import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButtonHome from '../components/BackButtonHome';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const url = `http://localhost:5555/inventory/report/${selectedDate}`;
      console.log("Request URL:", url); 
      axios.get(url)
        .then((response) => {
          console.log("Response Data:", response.data); 
          setReportData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error:", error); 
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
      <div className='mb-4'>
        <BackButtonHome />
      </div>
      <div className='mb-4'>
        <label htmlFor='dateFilter' className='mr-2'>Select Date:</label>
        <input type='date' id='dateFilter' value={selectedDate} onChange={handleDateChange} />
      </div>
        <div className="overflow-x-auto">
          <table className='w-full table-auto'>
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Sku</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
              
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={item._id} className="text-center">
                  <td className="border px-4 py-2">{item.Sku}</td>
                  <td className="border px-4 py-2">{item.Brand}</td>
                  <td className="border px-4 py-2">{item.Price}</td>
                  <td className="border px-4 py-2">{item.Quantity}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Report;
