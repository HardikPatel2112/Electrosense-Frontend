import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
  } from "mdb-react-ui-kit";
  import React, { useEffect, useState } from "react";
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "../styles/cart.css"
import CartSummaryItems from "components/Cart/CartSummaryItems";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from 'components/hero/BackgroundAsImage.js'
import { FetchUserCart, PostAddToCart, deleteFromCart } from "Utility/Api";
import {ToastSuccess,ToastError} from "components/Toaster/ToastAlert";

  export default function Cart() {

    const [cartItems, setCartItems] = useState(
      localStorage?.getItem("cartItems")
        ? JSON.parse(localStorage?.getItem("cartItems"))
        : []
    );

    useEffect(()=>{      
    },[cartItems] );
    
  const handleRemoveFromCart = async (productId) => {
    const response = await deleteFromCart(productId);

    if (response.status === 200) {

      var updateditems=cartItems.filter((item) => item.productId != productId)
      setCartItems(updateditems);
      localStorage.setItem("cartItems", JSON.stringify(updateditems));
      ToastSuccess("Removed From Cart!");
    } else {
      ToastError("failed to RemoveFromCart");
    }
  };

  const handleAlterQuantity = async (cartItem, quantitychange) => {


    const updatedProducts = cartItems.map((product) => {
      if (product.productId === cartItem.productId) {
        return {
          ...product,
          quantity:
          product.quantity + quantitychange,
        };
      }
      return product;
    });
    const index = updatedProducts?.findIndex(
      (item) => item.productId === cartItem.productId
    );
  
    const response = await PostAddToCart({
        productId: cartItem.productId,
        supplierId:cartItem.supplierId,    
        quantity: updatedProducts[index].quantity,
      });
    if (response.status === 200) {
      setCartItems(updatedProducts);
      localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
    } else {
      console.log("failed to alter quantity");
    }
  };

  const handleEditQuantity = async (e, item) => {
    let i = cartItems.find((x) => x.productId == item.productId);
    if (!i) {
      return;
    }

    const updatedProducts = cartItems.map((product) => {
      if (product.productId === item.productId) {
        return {
          ...product,
          quantity: e.target.value,
        };
      }
      return product;
    });

    const response = await PostAddToCart({
      productId: item.productId,
      supplierId:item.supplierId,    
      quantity:  e.target.value,
    });

    if (response.status === 200) {
      setCartItems(updatedProducts);
      localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
    } else {
      console.log("failed to edit quantity");
    }
 
   
  };


  return (
    <AnimationRevealPage>
    <Hero />
  <section className="h-100 gradient-custom">
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center my-4">
        <MDBCol md="8">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <MDBTypography tag="h5" className="mb-0">
                Cart  items  
              </MDBTypography>
              
            </MDBCardHeader>
            <MDBCardBody> 
           
              {cartItems && cartItems.map((cartItem,index)=>{
                return <CartSummaryItems 
                cartItem={cartItem}  key={index}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAlterQuantity={handleAlterQuantity}
                handleEditQuantity={handleEditQuantity}
                />  
              })}             
            </MDBCardBody>
          </MDBCard>
  
          <MDBCard className="mb-4">
            <MDBCardBody>
              <p>
                <strong>Expected shipping delivery</strong>
              </p>
              <p className="mb-0">{new Date(Date.now()).toLocaleDateString()}</p>
            </MDBCardBody>
          </MDBCard>
  
          <MDBCard className="mb-4 mb-lg-0">           
          </MDBCard>
        </MDBCol>


        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardHeader>
              <MDBTypography tag="h5" className="mb-0">
                Summary
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                {/* <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>$53.98</span>
                </MDBListGroupItem> */}

                {cartItems && cartItems.map((cartItem,index)=>{

                  return (
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                    &nbsp; {cartItem.productName} - ({cartItem.supplierName}) 
                    <span>   X   {cartItem.quantity}</span>
                  </MDBListGroupItem>
                  );
                })}
           
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total Items - {cartItems.length}</strong>
                    {/* <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong> */}
                  </div>
                  <span>
                    <strong></strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
  
              <MDBBtn block size="lg">
                Submit Order
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
</AnimationRevealPage>
  );
  }

