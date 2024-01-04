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
import { getAllProducts } from "Utility/Api";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "components/Spinners/Spinner";
import { SetProductsReducer } from "Redux/slice/productsSlice";

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;


  const [tabs, setTabsProducts] = useState({});
  const [isLoading,SetisLoading]=useState(true);
  

  const allProducts=useSelector(state=>state?.productsStore);

  const dispatch=useDispatch();
 
  useEffect(() => {
    const fetchData = async () => {
      SetisLoading(true);
      let p=allProducts.products;
      try {

        if(p?.length<1){
          p = await getAllProducts();
          dispatch(SetProductsReducer(p));
        }     
      
        setTabsProducts((prevState) => ({
          ...prevState,
          ["All"]:p,
          ["Automation"]: p?.filter(item =>  item.Tag === 'Automation'),
          ["SwitchGear"]: p?.filter(item =>  item.Tag === 'SwitchGear'),
          ["Other"]: p?.filter(item =>  item.Tag === 'Other'),

        }));
      } catch (error) {     
        console.error('Error fetching products:', error);
      }
      SetisLoading(false);
    };     
    fetchData();
  }, []);



  return (
    <AnimationRevealPage>
      
      <Hero/>
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
   {isLoading ? <Spinner/> : 
       <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>Products.</HighlightedText>
          </>
        }
        tabs={tabs}
      /> }
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
      <Footer />
    </AnimationRevealPage>
  );
};
