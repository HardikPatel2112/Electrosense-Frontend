import axios from "axios";
import '../styles/datatableCustom.css'
import jwtDecode from "jwt-decode";

const baseurl= "https://e2020231012190229.azurewebsites.net/api";


var decodedToken=localStorage?.getItem("token")? jwtDecode(localStorage?.getItem("token")) :null;

const getAllProducts =async () => {
    const response = await axios.get(baseurl + `/Products/GetList?nameid=${decodedToken?.nameid}`,config);
    
    const newElement = response.data.result.map((item) => ({
        name: item.name,
        imageSrc:baseurl + "/Images/"+item.name+".png",
        description: item.description, 
        url: "products/"+item.id,
        Tag:item.tag,
        ProductImageName:item.productImageName,
        productId:item.id,
        suppliers:item.suppliers,
        selectedSupplierId:   item.selectedSupplierId
      }));
      return newElement;    
};




const PostAddToCart=async(obj)=>{
  return (await axios.post(
    baseurl + `/Cart/AddToCart`,
    obj,
    config
  ));
}

const deleteFromCart=async(productId)=>{
  return (
    await axios.delete(
  baseurl + `/Cart/RemoveFromCart?productId=${productId}`,
  config
  ));
}

const FetchUserCart=async(productId)=>{
  return (
 await axios.get(
      baseurl + `/Cart/GetUserCart`,
      config
    )
  );
}

const PostAddProduct=async(productToAdd)=>{
  return (
 await axios.post(
     baseurl + '/Products/Add',
      productToAdd,
      config
    )
  );
}

const FetchSuppliers=async()=>{
  return (
    await axios.get(baseurl + "/suppliers/List")
    );
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
export {getAllProducts,PostAddToCart,deleteFromCart,FetchUserCart,PostAddProduct,FetchSuppliers};