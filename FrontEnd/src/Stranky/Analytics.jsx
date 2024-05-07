import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import BackButtonHome from '../components/BackButtonHome';

const Analytics = () => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/shops')
      .then((response) => {
        const shopNames = response.data.data.map(shop => shop.ShopName);
        const shopDataRequests = shopNames.map(shopName => {
          return axios.get('http://localhost:5555/inventory', { params: { shop: shopName } });
        });

        axios.all(shopDataRequests)
          .then(axios.spread((...responses) => {
            const aggregatedData = responses.map((response, index) => ({
              shopName: shopNames[index],
              salesData: response.data.data,
            }));
            setShopData(aggregatedData);
            setLoading(false);
          }))
          .catch(error => {
            console.error('Error fetching shop data:', error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching shop names:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <h1 className="text-3xl my-8">Analytics</h1>
      <div className='p-4'>
        <BackButtonHome />
      </div>
        <div>
          {shopData.map(shop => (
            <div key={shop.shopName} className="mb-8 text-center">
              <h2 className="text-2xl mb-4">{shop.shopName}</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Sku</th>
                      <th className="px-4 py-2">Total Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shop.salesData
                      .sort((a, b) => b.SalesInTotal - a.SalesInTotal)
                      .slice(0, 5) 
                      .map((item, index) => (
                        <tr key={item._id} className="text-center">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{item.Sku}</td>
                          <td className="border px-4 py-2">{item.SalesInTotal}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Analytics;
