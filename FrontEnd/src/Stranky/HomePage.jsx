import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <nav>
        <ul>
        <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/Analytics">Analytics</Link></li>
          <li><Link to="/Report">Report</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
