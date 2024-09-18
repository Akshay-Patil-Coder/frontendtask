import React from 'react';
import './Home.css'; 
import Navbar from './Navbar';

function Newhome() {
  return (
    <div>
      <Navbar />
      <div className="newhome-container">
        <img 
          src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726642800&semt=ais_hybrid"
          alt="Logo" 
        />
        <h1>Welcome to the Home Page</h1>
      </div>
    </div>
  );
}

export default Newhome;
