import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import MainFeature1 from "components/features/TwoColWithButton.js";
import Hero from 'components/hero/BackgroundAsImage.js'
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from "components/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";
import supp from "../electrosenseResources/images/bluechip.jpg"

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <MainFeature1
        subheading={<Subheading>About Electrosense</Subheading>}
        heading="Manufacturering & Supply"
        buttonRounded={false}
        primaryButtonText="See Portfolio"
        imageSrc={supp}
      />
      
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="Quality Beyond Your Expectations"
        description=""
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "24/7 Support",
            description: ""
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description: ""
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description: ""
          },
        ]}
        linkText=""
      />
      {/* <TeamCardGrid 
        subheading={<Subheading>Our Team</Subheading>}
      /> */}
      <Footer />
    </AnimationRevealPage>
  );
};
