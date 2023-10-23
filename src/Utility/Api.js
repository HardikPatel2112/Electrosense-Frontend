import axios from "axios";
import '../styles/datatableCustom.css'

const getAllProducts =async () => {
    const response = await axios.get("https://e2020231012190229.azurewebsites.net/api/Products/GetList");
    const newElement = response.data.result.map((item) => ({
        name: item.name,
        imageSrc:"https://e2020231012190229.azurewebsites.net/api/products/"+item.name,
        description: item.description, 
        url: "products/"+item.id,
        Tag:item.tag,
        ProductImageName:item.productImageName,
        productId:item.id,
        suppliers:item.suppliers
      }));
      return newElement;    
};


export {getAllProducts};
