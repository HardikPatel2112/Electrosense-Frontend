import axios from "axios";
import '../styles/datatableCustom.css'
import jwtDecode from "jwt-decode";
import getApiConfig from "./apiConfig";

//const baseurl= "https://e2020231012190229.azurewebsites.net/api";

//const baseurl= "https://localhost:5001/api";

const baseurl='https://electrosense.bsite.net/api';



var decodedToken=localStorage?.getItem("token")? jwtDecode(localStorage?.getItem("token")) :null;

const getAllProducts =async () => {
    const response = await axios.get(baseurl + `/Products/GetList?nameid=${decodedToken?.nameid}`,getApiConfig());
    
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


const UploadImageApi = async(name,formData)=>{
  return (await fetch(baseurl +'/Images/upload?imagename='+name, {
    method: 'POST',
    body: formData
  })
)};






const deleteFromCart=async(productId)=>{
  return (
    await axios.delete(
  baseurl + `/Cart/RemoveFromCart?productId=${productId}`,
  getApiConfig()
  ));
}

const deleteProductApi=async(productId)=>{
  return (
    await axios.delete(
  baseurl + `/Products/Delete?id=${productId}`  
  ));
}

const FetchUserCart=async()=>{
  return (
 await axios.get(
      baseurl + `/Cart/GetUserCart`,
      getApiConfig()
    )
  );
}

const PostAddProduct=async(productToAdd)=>{
  return (
 await axios.post(
     baseurl + '/Products/Add',
      productToAdd,
      getApiConfig()
    )
  );
}
const PostAddToCart=async(obj)=>{
  return (await axios.post(
    baseurl + `/Cart/AddToCart`,
    obj,
    getApiConfig()
  ));
}

const FetchSuppliers=async()=>{
  return (
    await axios.get(baseurl + "/suppliers/List")
    );
  }

  const loginApi=async(loginCred)=>{
    return (
      await axios.post(baseurl +'/auth/login',loginCred)
    );
  }

  const SignupApi=async(values)=>{
    return (
      await axios.post(baseurl +'/auth/register',values)
    );
  }



export {getAllProducts,PostAddToCart,deleteFromCart,
  FetchUserCart,PostAddProduct,FetchSuppliers,
  UploadImageApi,deleteProductApi,loginApi,SignupApi};