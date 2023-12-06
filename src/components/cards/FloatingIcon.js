import React, { useEffect, useState } from 'react';
import "../../styles/floatingbutton.css"
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




const FloatingIcon = () => {


   const [ItemsCount,setCartItemCount]=useState(0);
   const itemsFromState=useSelector((state)=>state?.cartItemsStore);

  
  useEffect(() => { 

    console.log("ue of FloatingIcon triggered",itemsFromState);       
    setCartItemCount(itemsFromState.cartItems.length);
  }, [itemsFromState.cartItems.length]);  


  

  return (
    <Link to="/cart">  <div className="floating-icon">
    <FaCartShopping size={21}/> {ItemsCount}
    </div>
    </Link>
  
  );
};

export default FloatingIcon;
