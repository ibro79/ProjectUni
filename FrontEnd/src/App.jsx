import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inventory from './Stranky/Inventory';
import CreateInventory from './Stranky/CreateInventory';
import EditInventory from './Stranky/EditInventory';
import DeleteInventory from './Stranky/DeleteInventory';
import SalesInventory from './Stranky/SalesInventory';
import AddQuantityInventory from './Stranky/AddQuantityInventory';
import Analytics from './Stranky/Analytics';
import Report from './Stranky/Report';
import HomePage from './Stranky/HomePage';

const App = () => {
  return (
    <Routes>
    
      <Route path='/' element={<HomePage />} />
      <Route path='/Analytics' element={<Analytics />} />
      <Route path='/Report' element={<Report />} />
      <Route path='/inventory' element={<Inventory />} />
      <Route path='/inventory/create' element={<CreateInventory />} />
      <Route path='/inventory/edit/:id' element={<EditInventory />} />
      <Route path='/inventory/delete/:id' element={<DeleteInventory />} />
      <Route path='/inventory/sales/:id' element={<SalesInventory />} />
      <Route path='/inventory/addquantity/:id' element={<AddQuantityInventory />} />
    </Routes>
  );
};

export default App;