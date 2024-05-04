import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Stranky/Home';
import CreateInventory from './Stranky/CreateInventory';
import ShowInventory from './Stranky/ShowInventory';
import EditInventory from './Stranky/EditInventory';
import DeleteInventory from './Stranky/DeleteInventory';
import SalesInventory from './Stranky/SalesInventory';
import AddQuantityInventory from './Stranky/AddQuantityInventory';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/invent/create' element={<CreateInventory />} />
      <Route path='/invent/details/:id' element={<ShowInventory />} />
      <Route path='/invent/edit/:id' element={<EditInventory />} />
      <Route path='/invent/delete/:id' element={<DeleteInventory />} />
      <Route path='/invent/sales/:id' element={<SalesInventory />} />
      <Route path='/invent/addquantity/:id' element={<AddQuantityInventory />} />
    </Routes>
  );
};

export default App;