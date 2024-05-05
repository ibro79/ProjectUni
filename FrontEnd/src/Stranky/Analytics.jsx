import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
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
        // Fetch sales data for each shop
        const shopDataRequests = shopNames.map(shopName => {
          return axios.get('http://localhost:5555/inventory', { params: { shop: shopName } });
        });

        // Wait for all requests to resolve
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
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {shopData.map(shop => (
            <div key={shop.shopName} className="mb-8">
              <h2 className="text-2xl mb-4">{shop.shopName}</h2>
              <table className="w-full border-separate border-spacing-2">
                <thead>
                  <tr>
                    <th className="border border-slate-600 rounded-md">#</th>
                    <th className="border border-slate-600 rounded-md">Sku</th>
                    <th className="border border-slate-600 rounded-md">Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {shop.salesData
                    .sort((a, b) => b.SalesInTotal - a.SalesInTotal)
                    .slice(0, 5) // Display top 5 items
                    .map((item, index) => (
                      <tr key={item._id} className='h-8'>
                        <td className='border border-slate-700 rounded-md text-center'>
                          {index + 1}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                          {item.Sku}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                          {item.SalesInTotal}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analytics;
