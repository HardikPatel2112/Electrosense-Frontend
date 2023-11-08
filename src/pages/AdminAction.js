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
import 'react-toastify/dist/ReactToastify.css';
import withAuthorization from "Utility/withAuthorization";
import {ToastSuccess,ToastError} from "components/Toaster/ToastAlert";
import Spinner from "components/Spinners/Spinner";


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;


function AdminAction() {
  const [data, setData] = useState([]);
  const [isLoading,SetisLoading]=useState(true);
 

  const handleDeleteProduct = async (row) => {
    console.log(row);
    try {
      const response = await axios.delete(`https://e2020231012190229.azurewebsites.net/api/Products/Delete?id=${row.productId}`);
           setData(prevData => prevData.filter(item => item.productId !== row.productId));   
      ToastSuccess("Deleted Successfully!")

    } catch (error) {
      ToastError("Error Deleting !")  
      // Optionally, handle errors or display a message
    }
  }; 
   
  
  const columns = [
    {
      name: "Name",
      selector: "description",
      sortable: true,
      // style: {
      //   background: "gray",
      // },
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Tag",
      selector: "Tag",
      sortable: true,
    },
    // {
    //   name: "Product Image Name",
    //   selector: "ProductImageName",
    //   sortable: true,
    // },
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
        SetisLoading(false);
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

        <Header/>
        
        <Container>         

          <Content >
         
            <Link to="/AdminAction/AddProduct" className="btn-add">Add Product</Link>         
          <br/>  <br/>

           
            <DataTableExtensions filterDigit={0}  columns={columns} data={data} print={true} export={false} >     
            { isLoading?  <Spinner/> :
              <DataTable     pagination  highlightOnHover  customStyles={tableCustomStyles}   />      }  
            </DataTableExtensions>
         
          </Content>

        </Container>      
        <Footer />
      </AnimationRevealPage>
    </div>
  );
}

export default withAuthorization(AdminAction) 

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





