import React, { useState } from 'react';
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from 'components/hero/BackgroundAsImage.js'

// function Cart() {
//   return (
//     <AnimationRevealPage>  
//         <Hero />
//     <div>Cart</div>
//     </AnimationRevealPage>

//   )
// }

// export default Cart



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
  };

  return (
    <AnimationRevealPage> 
    <div className="shopping-cart">
       <Hero />
      <h2>Shopping Cart</h2>
      <ul>
        {JSON.parse(localStorage.getItem('cartItems')).map((product) => (
          <li key={product.id}>
            {product.productId} - ${product.suppliersId}
            <button onClick={() => removeFromCart(product)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Here, you can display the total price, checkout button, etc. */}
    </div>
    </AnimationRevealPage>
  );
};

export default Cart;

