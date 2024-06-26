import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SalesInventory = () => {
  const [sales, setSales] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${id}`)
      .then((response) => {
        setSales(response.data.Sales);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Something went wrong');
      });
  }, [id]);

  const handleSave = () => {
    const data = {
      Sales: sales,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/inventory/${id}`, data)
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
      <h1 className='text-3xl my-4'>Sales</h1>
      <BackButton />
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Sales</label>
          <input
            type='text'
            value={sales}
            onChange={(e) => setSales(e.target.value)}
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

export default SalesInventory;
