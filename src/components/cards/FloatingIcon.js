import React from 'react';
import "../../styles/floatingbutton.css"
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const FloatingIcon = () => {
  return (
    <Link to="/cart">  <div className="floating-icon">
    <FaCartShopping size={21}/> {JSON.parse(localStorage.getItem('cartItems'))?.length}
    </div>
    </Link>
  
  );
};

export default FloatingIcon;
