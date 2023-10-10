import AnimationRevealPage from "helpers/AnimationRevealPage";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { getAllProducts } from "Utility/Api";
import Header from "components/headers/light.js";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import axios from "axios";
import { BiSolidCoffeeTogo } from "react-icons/bi";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hero from "components/hero/BackgroundAsImage.js";
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;


export default function AdminAction() {
  const [data, setData] = useState([]);
const [isChange,TriggerChange]=useState(false);
  

  const handleDeleteProduct = async (row) => {
    console.log(row);
    try {
      const response = await axios.delete(`https://localhost:7051/api/Products/Delete?id=${row.id}`);
     
      setData(prevData => prevData.filter(item => item.id !== row.id));
      toast.success("Deleted Successfully!" ,{position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"})     

    } catch (error) {
      toast.error("Error Deleting !" ,{position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"})  
      // Optionally, handle errors or display a message
    }
  }; 
   
  
  const columns = [
    {
      name: "Name",
      selector: "title",
      sortable: true,
      // style: {
      //   background: "gray",
      // },
    },
    {
      name: "Description",
      selector: "content",
      sortable: true,
    },
    {
      name: "Tag",
      selector: "Tag",
      sortable: true,
    },
    {
      name: "Product Image Name",
      selector: "ProductImageName",
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <button onClick={() => handleDeleteProduct(row)}><BiSolidCoffeeTogo/></button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {

    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setData(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(data);
  }, []);

  return (
    <div>
      <AnimationRevealPage>

        <Hero/>
        
        <Container>         

          <Content >
            <Link to="/AdminAction/AddProduct" className="btn-add">Add Product</Link>         
          <br/>  <br/>
            <DataTableExtensions filterDigit={0}  columns={columns} data={data} print={true} export={false} >     

              <DataTable     pagination  highlightOnHover  customStyles={tableCustomStyles}   />    
            </DataTableExtensions>
          </Content>

        </Container>      
        <Footer />
      </AnimationRevealPage>
    </div>
  );
}

const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "20px",
      fontWeight: "bold",
      paddingLeft: "10px",
      justifyContent: "left",
      backgroundColor: "rgb(100 21 255)",
      //borderWidth:"medium"
      
    },
  },
};
export { tableCustomStyles };





