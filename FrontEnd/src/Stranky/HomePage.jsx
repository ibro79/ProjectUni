import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100 p-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">Invent System</h1>
        <nav className="flex flex-col items-start">
          <Link to="/inventory" className="text-lg text-blue-600 hover:underline mb-4">Inventory</Link>
          <Link to="/analytics" className="text-lg text-blue-600 hover:underline mb-4">Analytics</Link>
          <Link to="/report" className="text-lg text-blue-600 hover:underline mb-4">Report</Link>
        </nav>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Created by: Maslic Ibro</p>
      </div>
    </div>
  );
}

export default HomePage;
