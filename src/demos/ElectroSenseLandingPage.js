import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import chefIconImageSrc from "images/chef-icon.svg";
import Satisfaction from "../electrosenseResources/icons/icon 02.png";
import Quality from "../electrosenseResources/icons/icon 05.png";
import Experience from "../electrosenseResources/icons/icon 08.png";

import axios from "axios";
import { getAllProducts } from "Utility/Api";
import landingimage from '../electrosenseResources/images/landingpage.jpg'

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;

  const [tabs, setTabsProducts] = useState({});

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const automationProducts = await getAllProducts();
        setTabsProducts((prevState) => ({
          ...prevState,
          ["All"]:automationProducts,
          ["Automation"]: automationProducts.filter(item =>  item.Tag === 'Automation'),
          ["SwitchGear"]: automationProducts.filter(item =>  item.Tag === 'SwitchGear'),
          ["Other"]: automationProducts.filter(item =>  item.Tag === 'Other'),

        }));
      } catch (error) {     
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <AnimationRevealPage>
      
      <Hero/>
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>Products.</HighlightedText>
          </>
        }
        tabs={tabs}
      />
      <Features
        heading={
          <>
            Amazing <HighlightedText>Services.</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc: Quality,
            title: "Quality",
            description: "100%  Assured Product Quality",
            url_: "",
          },
          {
            imageSrc: Satisfaction,
            title: "Satisfaction",
            description: "100% Customer Satisfaction",
            url_: "",
          },
          {
            imageSrc: Experience,
            title: "Experience",
            description: "More than 10  Years Of Experience",
            url_: "",
          },
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      {/* <MainFeature2
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={
          <>
            Why <HighlightedText>Choose Us ?</HighlightedText>
          </>
        }
        statistics={[
          {
            key: "Orders",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+",
          },
          {
            key: "Chefs",
            value: "1500+",
          },
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNzI2fQ&auto=format&fit=crop&w=768&q=80"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      /> */}
      {/* <Testimonial
        subheading=""
        heading={
          <>
            Customers <HighlightedText>Love Us.</HighlightedText>
          </>
        }
      /> */}
      {/* <DownloadApp
        text={
          <>
            People around you are ordering delicious meals using the{" "}
            <HighlightedTextInverse>Electrosense App.</HighlightedTextInverse>
          </>
        }
      /> */}
      <Footer />
    </AnimationRevealPage>
  );
};
