import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
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
  const navigate = useNavigate();

  // Fetch shop names from the backend on component mount
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

    fetchShopNames();
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
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('Something went wrong');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>New Inventory</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Sku</label>
          <input
            type='text'
            value={Sku}
            onChange={(e) => setSku(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Brand</label>
          <input
            type='text'
            value={Brand}
            onChange={(e) => setBrand(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='text'
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <input
            type='text'
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Shop Name</label>
          <select
            value={ShopName}
            onChange={(e) => setShopName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value='' disabled>Select Shop</option>
            {shopNames.map((shopName, index) => (
              <option key={index} value={shopName}>{shopName}</option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Sales</label>
          <input
            type='text'
            value={Sales}
            onChange={(e) => setSales(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='text'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
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
