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
  import React from "react";
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "../../styles/cart.css"
import { useState } from "react";

function CartSummaryItems(props) {


  const [qty,SetQty]=useState(props.cartItem.quantity);

  const ClickRemoveFromCart =async (productId)=>{
    await props.handleRemoveFromCart(productId)
  }

  const ClickAlterQty=async (cartItem,qtych)=>{
    SetQty(qty+qtych);
    await props.handleAlterQuantity(cartItem,qtych)
  }

  const InputEditQuantity =async (e,cartItem)=>{
    SetQty(Number(e.target.value));
    await props.handleEditQuantity(e,cartItem)
  }

  return (
    <>
      <MDBRow>
        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
          <MDBRipple
            rippleTag="div"
            rippleColor="light"
            className="bg-image rounded hover-zoom hover-overlay"
          >
            <img
              src={`https://localhost:5001/api/Images/${props.cartItem.productName}.png`}

              className="w-100"
            />
            <a href="#!">
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
              ></div>
            </a>
          </MDBRipple>
        </MDBCol>

        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
          <p>
            <strong>{props.cartItem.productName}</strong>
          </p>
          <p>{props.cartItem.supplierName}</p>          


          <MDBTooltip
            wrapperProps={{ size: "sm" }}
            wrapperClass="me-1 mb-2"
            title="Remove item"
       
          >
            <MDBIcon fas icon="trash"  onClick={()=>ClickRemoveFromCart(props.cartItem.productId)}  />
          </MDBTooltip>

          <MDBTooltip
            wrapperProps={{ size: "sm", color: "danger" }}
            wrapperClass="me-1 mb-2"
            title="Move to the wish list"
          >
            <MDBIcon fas icon="heart" />
          </MDBTooltip>
        </MDBCol>
        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <MDBBtn className="px-3 me-2">
              <MDBIcon fas icon="minus" onClick={()=>ClickAlterQty(props.cartItem,-1)} />
            </MDBBtn>

            <MDBInput onChange={(e)=>InputEditQuantity(e,props.cartItem)} value={qty} defaultValue={props.cartItem.quantity} min={0} type="number" label="Quantity" />

            <MDBBtn className="px-3 ms-2">
              <MDBIcon fas icon="plus" onClick={()=> ClickAlterQty(props.cartItem,1)}  />
            </MDBBtn>
          </div>

          {/* <p className="text-start text-md-center">
            <strong>$17.99</strong>
          </p> */} 
          
        </MDBCol>
      </MDBRow>

      <hr className="my-4" />
    </>
  );
}

export default CartSummaryItems;
