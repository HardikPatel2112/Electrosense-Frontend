import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import landingimage from '../../electrosenseResources/images/landingpage.jpg'
import jwtDecode from "jwt-decode";
import { ToastContainer } from 'react-toastify';
import FloatingIcon from "../cards/FloatingIcon.js";

import { useDispatch } from "react-redux";
import { resetStoreAction } from "Redux/store.js";
const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-black hover:border-gray-300 hover:text-pink-600`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-orange-500`}
  }
`;

const StyledHeaderHome = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-pink-600`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-orange-500`}
  }
`;

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url(${landingimage});
`;

const ContainerNoImage = styled.div`
  ${tw`relative -mx-10 -mt-10 bg-center bg-cover`}
    height:6rem;
  `;

const OpacityOverlayHome = tw.div`z-10 absolute inset-0 bg-primary-900 opacity-25`;
const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-white opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-400 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-500 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
  padding-bottom: 56.25% !important;
  padding-top: 0px !important;
  ${tw`rounded`}
  iframe {
    ${tw`rounded bg-black shadow-xl`}
  }
`;

export default () => {

  var token=localStorage?.getItem('token');
  const[isloggedIn,SetLoginStatus]=useState(token? true :false);
  const location =useLocation();

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');

    SetLoginStatus(false);
    navigate("/")
  
   
  }

  useEffect(() => { 
      
  }, [isloggedIn,location]);
 

  const navLinks = [
    <NavLinks key={1}>
    <Link to="/">  <NavLink href="/#"> Home</NavLink></Link>
     <Link to="/AboutUs">  <NavLink href="/#"> AboutUs</NavLink></Link>
    {/* <Link to="/blogIndex">    <NavLink href="/#">Blog</NavLink> </Link>
    <Link to="/pricing">   <NavLink href="/#">Pricing</NavLink> </Link> */}
    <Link to="/contactUs"> <NavLink href="/#">Contact Us</NavLink></Link>

    {/* <Link to="/cart"> <NavLink href="/#">cart</NavLink></Link> */}

{
  isloggedIn && jwtDecode(token)?.role?.toUpperCase()=='ADMIN' &&
  <Link to="/AdminAction">  <NavLink to="/AdminAction">AdminAction</NavLink> </Link>  
}      

    {   
     isloggedIn ?   
(   <><PrimaryLink onClick={handleLogout} tw="lg:ml-12!">Logout</PrimaryLink> </>
    ) :

     <Link to="/login"><PrimaryLink tw="lg:ml-12!">Login</PrimaryLink></Link>
     
    }
   </NavLinks>
  ];


  return (

  <>
    {
        (location && location.pathname=="/" ) ? 
        
        <Container>
<OpacityOverlayHome />
<ToastContainer/>
      <HeroContainer>
        <StyledHeaderHome links={navLinks} />     
        <FloatingIcon/> 
        <TwoColumn>
          <LeftColumn>
            <Notification> WELCOME TO</Notification>
            <Heading>
            <SlantedBackground style={{fontSize:"3rem" }}>  ELECTROSENSE AUTOMATION </SlantedBackground>
              <span style={{fontSize:'1.7rem'}}> Manufacturer & Supplier of
        Industrial Automation <br/> and Switchgears Products </span>
              <br />
           
            </Heading>
            <PrimaryAction>Explore Products</PrimaryAction>
          </LeftColumn>
          <RightColumn>
            <></>
            {/* <StyledResponsiveVideoEmbed
              url="//player.vimeo.com/video/374265101?title=0&portrait=0&byline=0&autoplay=0&responsive=1"
              background="transparent"
            /> */}
          </RightColumn>
        </TwoColumn> 
   
      </HeroContainer>      
        </Container> 
        :

 <ContainerNoImage>
<OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />    
        <FloatingIcon/> 
   
      </HeroContainer>      
        </ContainerNoImage>           
        }     
  </>   
  );
};
