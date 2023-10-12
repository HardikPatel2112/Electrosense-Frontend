import axios from "axios";
import '../styles/datatableCustom.css'

const getAllProducts =async () => {
    const response = await axios.get("https://thenexttechnology.bsite.net/api/Products/GetList");
    const newElement = response.data.result.map((item) => ({
        title: item.name,
        imageSrc:btoa(item.productImage),
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
