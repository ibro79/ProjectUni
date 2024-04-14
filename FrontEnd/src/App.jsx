import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Stranky/Home';
import ShowInventory from './Stranky/ShowInventory';
import EditInventory from './Stranky/EditInventory';
import DeleteInventory from './Stranky/DeleteInventory';
import CreateInventory from './Stranky/CreateInventory';


const App = () => {
  return (
    <Routes> 

    <Route path= '/' element = {< Home />} />
    <Route path= '/invent/delete:id' element = {< DeleteInventory />} />
    <Route path= '/invent/edit/:id' element = {< EditInventory />} />
    <Route path= '/invent/details/:id' element = {< ShowInventory />} />
    <Route path= '/invent/create/' element = {< CreateInventory />} />

    </Routes>
  )
}

export default App