import axios from "axios";
import '../styles/datatableCustom.css'

const getAllProducts =async () => {
    const response = await axios.get("https://e2020231012190229.azurewebsites.net/api/Products/GetList");
    const newElement = response.data.result.map((item) => ({
        title: item.name,
        imageSrc:"https://e2020231012190229.azurewebsites.net/api/products/"+item.name,
        content: item.description,
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "products/"+item.id,
        Tag:item.tag,
        ProductImageName:item.productImageName,
        id:item.id
      }));
      return newElement;    
};


export {getAllProducts};
