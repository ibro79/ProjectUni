import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInventory = () => {
  const [Sku, setSku] = useState('');
  const [Brand, setBrand] = useState('');
  const [Price, setPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Category, setCategory] = useState('');
  const [Sales, setSales] = useState('');
  const [ShopName, setShopName] = useState('');
  const [loading, setLoading] = useState(false);
  const [shopNames, setShopNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopNames = async () => {
      try {
        const response = await axios.get('http://localhost:5555/shops');
        if (Array.isArray(response.data.data)) {
          setShopNames(response.data.data.map(shop => shop.ShopName));
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching shop names:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5555/category');
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data.map(cat => cat.Category));
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchShopNames();
    fetchCategories();
  }, []);

  const InventorySave = () => {
    const data = {
      Sku,
      Brand,
      Price,
      Quantity,
      Category,
      Sales,
      ShopName,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/inventory', data)
      .then(() => {
        setLoading(false);
        navigate('/inventory');
      })
      .catch((error) => {
        setLoading(false);
        alert('Something went wrong');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      
      <h1 className='text-3xl my-4'>New Inventory</h1>
      <BackButton />
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4 w-full flex'>
          <label className='text-xl mr-4 text-gray-500 w-1/4'>Sku</label>
          <input
            type='text'
            value={Sku}
            onChange={(e) => setSku(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-3/4'
          />
        </div>
        <div className='my-4 w-full flex'>
          <label className='text-xl mr-4 text-gray-500 w-1/4'>Brand</label>
          <input
            type='text'
            value={Brand}
            onChange={(e) => setBrand(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-3/4'
          />
        </div>
        <div className='my-4 w-full flex'>
          <label className='text-xl mr-4 text-gray-500 w-1/4'>Price</label>
          <input
            type='text'
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-3/4'
          />
        </div>
        <div className='my-4 w-full flex'>
          <label className='text-xl mr-4 text-gray-500 w-1/4'>Category</label>
          <select
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-3/4'
          >
            <option value='' disabled>Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className='my-4 w-full flex'>
          <label className='text-xl mr-4 text-gray-500 w-1/4'>Shop Name</label>
          <select
            value={ShopName}
            onChange={(e) => setShopName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-3/4'
          >
            <option value='' disabled>Select Shop</option>
            {shopNames.map((shopName, index) => (
              <option key={index} value={shopName}>{shopName}</option>
            ))}
          </select>
        </div>
        <div className='my-4 w-full flex'>
          <label className='text-xl mr-4 text-gray-500 w-1/4'>Sales</label>
          <input
            type='text'
            value={Sales}
            onChange={(e) => setSales(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-3/4'
          />
        </div>
        <div className='my-4 w-full flex'>
          <label className='text-xl mr-4 text-gray-500 w-1/4'>Quantity</label>
          <input
            type='text'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-3/4'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={InventorySave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateInventory;
