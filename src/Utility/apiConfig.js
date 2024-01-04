

//  const apiConfig = {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     "Access-Control-Allow-Origin" : "*"
//   };




  const getApiConfig=()=>{
   return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    "Access-Control-Allow-Origin" : "*"
  };
  }


  export default getApiConfig;