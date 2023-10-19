import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useEffect } from "react";


const SelectWithtw = tw(Select)`
  w-full px-2 py-1 rounded-lg font-light bg-gray-100 
  border border-gray-100 placeholder-gray-500 text-sm 
  focus:outline-none focus:border-gray-400 focus:bg-white 
  mt-5 first:mt-2
`;

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

//const Select = tw.select`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

function AddProduct({ submitButtonText = "Add Product" }) {

const [newProduct, SetProduct] = useState(null);
const UploadImage = async () => { 

  const formData = new FormData();
  formData.append('file', newProduct.image);
  formData.append('Name', newProduct.name);
 let response =null;
  try {
     response = await fetch('https://e2020231012190229.azurewebsites.net/api/Products/upload?imagename='+newProduct.name, {
      method: 'POST',
      body: formData
    });
  
  } catch (error) {
    toast.error("Error to upload file !" ,{position: "top-right", autoClose: 5000, theme: "dark"})  
  }
    if (response.ok) {
      console.log('File uploaded successfully');
      const data = await response.json();
      return data.filename;
    } else {     
      toast.error("Failed to upload file !" ,{position: "top-right", autoClose: 5000, theme: "dark"})  
    }
};

const [suppliers,setsuppliers]=useState(null);

useEffect(() => {  
  
  const fetchandSetsuppliers = async () => {
    const response = await axios.get("https://e2020231012190229.azurewebsites.net/api/suppliers/List");

    const supOptions=response.data.result.map((item) => ({
      value: item.id,
       label:item.name
    }));
     setsuppliers(supOptions)
  };

  fetchandSetsuppliers();

}, []);  

const [selectedSupIds,setselectedSupIds]=useState([]);

console.log(selectedSupIds);

const handleSubmit = async (event) => {
  event.preventDefault();

 const imageName=await UploadImage();

  const productToAdd={
    Name:newProduct?.name,
    Tag:newProduct.Tag?newProduct.Tag:"Automation",
    Description:newProduct.description,
    ProductImageName: imageName,
    suppliersIds:selectedSupIds
  }

  try {
    const response =  await axios.post('https://e2020231012190229.azurewebsites.net/api/Products/Add',productToAdd);

    if (response.status === 200) {
  
      toast.success("Product added successfully!" ,{position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"}) 
    } else {
      
      toast.error("Failed to add product !" ,{position: "top-right", autoClose: 5000, theme: "dark"})  
    }
  } catch (error) {
    toast.error("Error adding product !" ,{position: "top-right", autoClose: 5000, theme: "dark"})  

  }
};

  return (
    <div>
      <AnimationRevealPage>
        <Header />
        <Container>
 
        <br/>
        <Heading>Add Product</Heading>
         
           
            <Form onSubmit={(event)=>handleSubmit(event)}>
        
                    <Input
                type="name"
                name="name"
                placeholder="Product Name"
                onChange={(event) =>
                  SetProduct((values) => ({
                    ...values,
                    [event.target.name]: event.target.value,
                  }))
                }
              />           
              
              <Input
                type="description"
                name="description"
                placeholder="Product Description"
                onChange={(event) =>
                  SetProduct((values) => ({
                    ...values,
                    [event.target.name]: event.target.value,
                  }))
                }
              />

              <Input
                accept="image/*"
                type="file"
                name="image"
                placeholder="Image"
                onChange={(event) =>
                  SetProduct((values) => ({
                    ...values,
                    [event.target.name]: event.target.files[0],

                  }))
                }
              />
              {/* <button type="button" onClick={handleUpload}>
              <AiOutlineCloudUpload /> Upload 
              </button>  */}

              <SelectWithtw
               options={[ { value: 'Automation', label: 'Automation' },{ value: 'SwitchGear', label: 'SwitchGear' },{ value: 'Other', label: 'Other' }]}
                type="Tag"
                name="Tag"
                placeholder="Tag"
                onChange={(selected) =>
                  SetProduct((values) => ({  ...values,
                    ["Tag"]: selected.value,
                  }))   }>
                <option selected value="Automation">Automation</option>
                <option value="SwitchGear">SwitchGear</option>
                <option value="Other">Other</option>
              </SelectWithtw>

              <SelectWithtw
               options={suppliers}
               isMulti
                type="suppliersIds"
                name="suppliersIds"
                placeholder="suppliers"
                onChange={(selected) =>
                  setselectedSupIds(selectedSupIds.concat(selected[selected.length-1].value)
                    )
                   }                  
                  >
       
              </SelectWithtw>
              <SubmitButton type="submit">
                <span className="text">{submitButtonText}</span>
              </SubmitButton>
            </Form>
        
        </Container>
        <br/>  <br/>
        <Footer />
      </AnimationRevealPage>
    </div>
  );
}

export default AddProduct;
