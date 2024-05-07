import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { BsPlusSquare } from 'react-icons/bs';
import BackButtonHome from '../components/BackButtonHome';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState('');
  const [shopNames, setShopNames] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/inventory', { params: { shop: selectedShop } })
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
    axios
      .get('http://localhost:5555/shops')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setShopNames(response.data.data.map((shop) => shop.ShopName));
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Inventory List</h1>
        <Link to="/inventory/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <BackButtonHome />
      <div className="mb-4">
        <label htmlFor="shopFilter" className="mr-2">
          Filter by Shop:
        </label>
        <select
          id="shopFilter"
          value={selectedShop}
          onChange={handleShopChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="">All Shops</option>
          {shopNames.map((shopName, index) => (
            <option key={index} value={shopName}>
              {shopName}
            </option>
          ))}
        </select>
      </div>
      
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Sku</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Price (CZK)</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Shop</th>
                <th className="px-4 py-2">Sold</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Operations</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((invent, index) => (
                <tr key={invent._id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{invent.Sku}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{invent.Brand}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{invent.Price}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{invent.Category}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{invent.ShopName}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{invent.SalesInTotal}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{invent.TotalQuantity}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/inventory/sales/${invent._id}`}>
                        <TbReportMoney className="text-green-800 text-xl" />
                      </Link>
                      <Link to={`/inventory/addquantity/${invent._id}`}>
                        <BsPlusSquare className="text-green-800 text-xl" />
                      </Link>
                      <Link to={`/inventory/edit/${invent._id}`}>
                        <AiOutlineEdit className="text-yellow-600 text-xl" />
                      </Link>
                      <Link to={`/inventory/delete/${invent._id}`}>
                        <MdOutlineDelete className="text-red-600 text-xl" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Inventory;
