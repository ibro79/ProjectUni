import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddQuantityInventory = () => {
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${id}`)
      .then((response) => {
        setQuantity(response.data.Quantity); 
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Something went wrong');
      });
  }, [id]);

  const handleSave = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/inventory/${id}`, { Quantity: quantity }) 
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
      <h1 className='text-3xl my-4'>Add Quantity</h1>
      <BackButton />
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='text'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddQuantityInventory;
