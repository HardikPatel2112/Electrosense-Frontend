import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import axios from "axios";
import illustration from "images/signup-illustration.svg";
import { useFormik } from "formik";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import logoes from "../electrosenseResources/images/ELECTROSENSE LOGO.png";
import { ToastContainer, toast } from 'react-toastify';
import { Link, Navigate } from "react-router-dom";
const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-8 flex flex-col items-center`;
const Heading = tw.h1`text-xl xl:text-xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;
const Select = tw.select`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-3 py-3 rounded-sm font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Sign Up ",
  socialButtons = [],
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "#",
}) =>  {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit:async values =>  {
      
      const response = await axios.post('https://e2020231012190229.azurewebsites.net/api/auth/register',values);
      if (response.status === 200) {        
        toast.success("SignUp In successfully!" ,{position: "top-right",  theme: "dark"}) 
        Navigate('/login');
      } else {      
        toast.error("Failed to SignUp !" ,{position: "top-right", autoClose: 5000, theme: "dark"})  
      }
    },
  });
  
  return (
    <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <ToastContainer/>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logoes} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img
                        src={socialButton.iconImageSrc}
                        className="icon"
                        alt=""
                      />
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                ))}
              </SocialButtonsContainer>
              <Form onSubmit={formik.handleSubmit}>
              <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />

                <label htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

               <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              <Select
                    id="role"
                    name="role"
                  
                    onChange={formik.handleChange}
                    value={formik.values.role}
                    >
                <option selected value="Admin">Admin</option>
                <option value="Customer">Customer</option>
    
              </Select>

                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
         
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link  tw="border-b border-gray-500 border-dotted" to="/login"> Sign In</Link>
                 
                </p>
              </Form>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
);
};
