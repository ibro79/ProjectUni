import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { TbReportMoney } from "react-icons/tb";
import { BsPlusSquare } from "react-icons/bs";
import BackButtonHome from '../components/BackButtonHome';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState('');
  const [shopNames, setShopNames] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/inventory', { params: { shop: selectedShop } })
      .then((response) => {
        setInventory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [selectedShop]);

  useEffect(() => {
    axios.get('http://localhost:5555/shops')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setShopNames(response.data.data.map(shop => shop.ShopName));
        } else {
          console.error('Response data is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching shop names:', error);
      });
  }, []);

  const handleShopChange = (e) => {
    setSelectedShop(e.target.value);
  };

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8" > Inventory List</h1>
        <Link to='/inventory/create' >
          <MdOutlineAddBox className='text-sky-800 text-4x1' />
        </Link>
      </div>
      <div className='p-4'>
      <BackButtonHome />
      </div>
      <div>
        <label htmlFor="shopFilter" className="mr-2">Filter by Shop:</label>
        <select id="shopFilter" value={selectedShop} onChange={handleShopChange}>
          <option value="">All Shops</option>
          {shopNames.map((shopName, index) => (
            <option key={index} value={shopName}>{shopName}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">#</th>
              <th className="border border-slate-600 rounded-md">Sku</th>
              <th className="border border-slate-600 rounded-md">Brand</th>
              <th className="border border-slate-600 rounded-md">Price (CZK)</th>
              <th className="border border-slate-600 rounded-md">Category</th>
              <th className="border border-slate-600 rounded-md">Shop</th>
              <th className="border border-slate-600 rounded-md">Sold</th>
              <th className="border border-slate-600 rounded-md">Quantity</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((invent, index) => (
              <tr key={invent._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {invent.Sku}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {invent.Brand}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {invent.Price}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {invent.Category}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {invent.ShopName}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {invent.SalesInTotal}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {invent.TotalQuantity}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/inventory/sales/${invent._id}`}>
                      <TbReportMoney className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/inventory/addquantity/${invent._id}`}>
                      <BsPlusSquare className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/inventory/edit/${invent._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/inventory/delete/${invent._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory;