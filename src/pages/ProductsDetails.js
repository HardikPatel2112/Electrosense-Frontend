import React from 'react'
import {  useParams } from 'react-router-dom';
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, Content2Xl } from 'components/misc/Layouts';
import Hero from "components/hero/BackgroundAsImage.js";

function ProductsDetails() {

    const { id } = useParams();
   
  return (

    <AnimationRevealPage>
    <Hero />
    <Container>
        <Content2Xl>
        <div> ProductsDetails {id}</div>
    <Footer/>
        </Content2Xl>

    </Container>

  </AnimationRevealPage>
  )
}

export default ProductsDetails