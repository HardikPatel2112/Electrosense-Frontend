

import jwtDecode from 'jwt-decode';
import React from 'react'

const withAuthorization=(WrappedComponent)=>{
    
    return (props)=>{

        const accessToken=localStorage.getItem('token');
        
        if(accessToken){
            const decodedToken=jwtDecode(accessToken);
            
            if(decodedToken.role.toUpperCase()=="ADMIN"){
                return <WrappedComponent {...props}/>;
            }         
        }  
         window.location.replace("/login");
        return null;

    }
}

export default withAuthorization;