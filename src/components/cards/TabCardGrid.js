import React, { useEffect, useRef, useState } from "react";
import { PostAddToCart,deleteFromCart,FetchUserCart } from "Utility/Api";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import {ToastSuccess,ToastError} from "components/Toaster/ToastAlert";

import {
  FaCartShopping,
  FaHeart,
  FaCirclePlus,
  FaSquareMinus,
  FaTrashCan,
} from "react-icons/fa6";
import Spinner from "components/Spinners/Spinner";


const imageContext = require.context(
  "../../electrosenseResources/Products",
  false,
  /\.(jpg|jpeg|png)$/
);
const imageNames = imageContext.keys().map(imageContext);
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;
const Select = tw.select`
  w-4/6 px-2 py-1 rounded-sm font-light bg-gray-100 
  border border-gray-100 placeholder-gray-500 text-sm 
  focus:outline-none focus:border-gray-400 focus:bg-white 
  mt-2 first:mt-0
`;
const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${(props) => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;
const CardText = tw.div`p-3 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({ heading, tabs }) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */

  const tabsKeys = Object.keys(tabs);

  if (tabsKeys.length < 1) {
    return null;
  }

  const [isLoading,SetisLoading]=useState(true);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]); //"Automation"
  const [cartItems, setCartItems] = useState(
    localStorage?.getItem("cartItems")
      ? JSON.parse(localStorage?.getItem("cartItems"))
      : []
  );

  const handleAddToWishlist = () => {
    console.log("handleAddToWishlist");
  };
  const handleInquiry = () => {
    console.log("handleInquiry");
  };


  const AddItemToCart = async (newItem, quantity) => {
    const index = cartItems?.findIndex(
      (item) => item.productId === newItem.productId
    );

    let selectedsupForProd = selectedSuppliers?.find(
      (item) => item.productId == newItem.productId
    );
    newItem.supplierId =
      selectedsupForProd?.supplierId > 0 ? selectedsupForProd?.supplierId : newItem.suppliers[0].id;
    if (index === -1) {
      newItem.quantity = quantity > 0 ? quantity : 1;
      console.log(newItem);
      let obj = {
        productId: newItem.productId,
        supplierId: newItem.supplierId,
        quantity: newItem.quantity,
        productName: newItem.name,
        supplierName: selectedsupForProd ? selectedsupForProd.supplierName : newItem.suppliers[0].name
      };

      const response = await PostAddToCart(obj);

      if (response.status === 200) {
        setCartItems(cartItems?.concat(obj));
        ToastSuccess("Product added successfully!")
       
      } else {
        ToastError("Failed to add product to cart !");      
      }
    } else {
      const updatedItems = [...cartItems];
      if (updatedItems.length > 0) {
        updatedItems[index].quantity =
          (updatedItems[index]?.quantity ? updatedItems[index]?.quantity : 0) +  1;
      }
      const response = await PostAddToCart({
        productId: newItem.productId,
        supplierId: newItem.supplierId,
        quantity: updatedItems[index].quantity,
      });

      if (response.status === 200) {
        setCartItems(updatedItems);
        ToastSuccess("quantity updateed!");
      } else {
        ToastError("Failed to add update quantity !");
      }
    }
  };

  const handleAddtoCart = (cartItem) => {
    AddItemToCart(cartItem);
  };

  const handleAlterQuantity = async (cartItem, quantitychange) => {
    let isAlreadyAdded =
      cartItems?.find((item) => item.productId == cartItem.productId)
        ?.productId > 0;

    if (!isAlreadyAdded && quantitychange === -1) return;

    if (!isAlreadyAdded) {
      AddItemToCart(cartItem, quantitychange);
    } else {
      const updatedProducts = cartItems.map((product) => {
        if (product.productId === cartItem.productId) {
          return {
            ...product,
            quantity:
              product.quantity + quantitychange < 0
                ? 0
                : product.quantity + quantitychange,
          };
        }
        return product;
      });
      const index = updatedProducts?.findIndex(
        (item) => item.productId === cartItem.productId
      );
      let selectedsupForProd = selectedSuppliers?.find(
        (item) => item.productId == cartItem.productId
      )?.supplierId;
      
      const response = await PostAddToCart({
          productId: cartItem.productId,
          supplierId:
            selectedsupForProd > 0
              ? selectedsupForProd
              : cartItem.suppliers[0].id,
          quantity: updatedProducts[index].quantity,
        });
      if (response.status === 200) {
        setCartItems(updatedProducts);
      } else {
        console.log("failed to alter quantity");
      }
    }
  };

  const [selectedSuppliers, setSuppliersSelection] = useState([]);

  const handleBindSupplier = async (e, productId) => {
    // sets selection of suppliers for product in state to use when product added to cart
    const updatedselection = selectedSuppliers.filter((prev) => {
      if (prev.productId != productId) {
        return prev;
      }
    });
    let sel = [{ productId: productId, supplierId: e.target.value ,supplierName: e.target.options[e.target.selectedIndex].text}].concat(
      updatedselection
    );
    setSuppliersSelection(sel);

    const index = cartItems?.findIndex((item) => item.productId === productId);
    if (index === -1) {
      return;
    }

    let item;
    const updatedProducts = cartItems.map((product) => {
      if (product.productId === productId) {
        item = product;
        return {
          ...product,
          supplierId: e.target.value,
        };
      }
      return product;
    });

    const response = await PostAddToCart({      
        productId: item.productId,
        supplierId: e.target.value,
        quantity: item.quantity
      });

    if (response.status === 200) {
      setCartItems(updatedProducts);
    } else {
      console.log("failed to add supplier");
    }
  };

  useEffect(() => {

    if (!localStorage.getItem("cartItems") && localStorage.getItem("token")) {

      async function setCartItemstolocal() {
        try {
          const response = await FetchUserCart();

          if (response.status === 200) {
            const newElement = response.data.result.map((item) => ({
              productId: item.productId,
              supplierId: item.supplierId,
              quantity: item.quantity,
              productName:item.productName,
              supplierName:item.supplierName
            }));
            setCartItems(newElement);
            localStorage.setItem("cartItems", JSON.stringify(newElement));
          } else {
            ToastError("failed to alter quantity");
          }
        } catch (error) {
          ToastError("An error occurred:", error);
        }
      }
      setCartItemstolocal();
    } else {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    SetisLoading(false);
  }, [cartItems]);

  const handleRemoveFromCart = async (productId) => {
    const response = await deleteFromCart(productId);

    if (response.status === 200) {
      setCartItems(cartItems.filter((item) => item.productId != productId));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      ToastSuccess("Removed From Cart!");
    } else {
      ToastError("failed to RemoveFromCart");
    }
  };

  const handleSaveQuantity = async (e, item) => {
    let i = cartItems.find((x) => x.productId == item.productId);

    const response = await PostAddToCart(i);

    if (response.status === 200) {
    } else {
      console.log("failed to alter quantity");
    }
  };
  const handleEditQuantity = async (e, item) => {
    let i = cartItems.find((x) => x.productId == item.productId);
    if (!i) {
      item.quantity = e.target.value;
      item.productName= item.name;
      let selectedsupForProd = selectedSuppliers?.find((item) => item.productId == item.productId)?.supplierId;
      item.supplierName= selectedsupForProd ? selectedsupForProd.name : item.suppliers[0].name
      setCartItems(
        cartItems.filter((e) => e.productId != item.productId)?.concat(item)
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return;
    }

    const updatedProducts = cartItems.map((product) => {
      if (product.productId === item.productId) {
        return {
          ...product,
          quantity:Number(e.target.value) ,
        };
      }
      return product;
    });
    setCartItems(updatedProducts);
  };

  return (

    
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>
{isLoading ? <Spinner/> : 

<>
{tabsKeys &&
          tabsKeys.length > 0 &&
          tabsKeys.map((tabKey, index) => (
            <TabContent
              key={index}
              variants={{
                current: {
                  opacity: 1,
                  scale: 1,
                  display: "flex",
                },
                hidden: {
                  opacity: 0,
                  scale: 0.8,
                  display: "none",
                },
              }}
              transition={{ duration: 0.4 }}
              initial={activeTab === tabKey ? "current" : "hidden"}
              animate={activeTab === tabKey ? "current" : "hidden"}
            >
              {tabs[tabKey].map((card, index) => (
                <CardContainer key={index}>
                  <Card
                    className="group"
                    href_={card.url}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <CardImageContainer imageSrc={card.imageSrc}>
                      <CardHoverOverlay
                        variants={{
                          hover: {
                            opacity: 1,
                            height: "auto",
                          },
                          rest: {
                            opacity: 0,
                            height: 0,
                          },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardButton onClick={handleInquiry}>
                          {" "}
                          Inquire Now{" "}
                        </CardButton>
                        <CardRatingContainer onClick={handleAddToWishlist}>
                          <CardRating>
                            <FaHeart cursor="pointer" />
                          </CardRating>
                        </CardRatingContainer>
                      </CardHoverOverlay>
                    </CardImageContainer>

                    <CardText>
                      <CardTitle>{card.name} </CardTitle>

                      <CardContent style={{ display: "flex" }}>
                        {/* <FaPeopleGroup cursor="pointer" size={20}/>  &nbsp; */}
                        Supplier: &nbsp;
                        <Select
                          id="Supplier"
                          name="Supplier"
                          onChange={(e) =>
                            handleBindSupplier(e, card.productId)
                          }
                        >
                          {card.suppliers.map((supplier, index) => (
                            <option value={supplier.id} key={index} selected={(supplier.id==card.selectedSupplierId)? true: false}>
                              {supplier.name}
                            </option>
                          ))}
                        </Select>
                      </CardContent>
                      <CardTitle
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FaCartShopping
                          onClick={() => handleAddtoCart(card)}
                          style={{ marginRight: "15px" }}
                          cursor="pointer"
                          size={30}
                        />

                        <FaTrashCan
                          onClick={() => handleRemoveFromCart(card.productId)}
                          style={{ marginRight: "100px" }}
                          cursor="pointer"
                          size={26}
                        />
                        <FaCirclePlus
                          onClick={() => handleAlterQuantity(card, 1)}
                          style={{ marginRight: "15px" }}
                          cursor="pointer"
                          size={25}
                        />
                        <input
                          style={{
                            marginRight: "15px",
                            width: "35px",
                            textAlign: "center",
                          }}
                          value={
                            cartItems?.find(
                              (item) => item.productId == card.productId
                            )?.quantity > 0
                              ? cartItems?.find(
                                  (item) => item.productId == card.productId
                                )?.quantity
                              : 0
                          }
                          onChange={(e) => handleEditQuantity(e, card)}
                          onBlur={(e) => handleSaveQuantity(e, card)}
                        />

                        <FaSquareMinus
                          onClick={() => handleAlterQuantity(card, -1)}
                          style={{ marginRight: "15px" }}
                          cursor="pointer"
                          size={25}
                        />
                      </CardTitle>
                    </CardText>
                  </Card>
                </CardContainer>
              ))}
            </TabContent>
          ))}
</>

}

        
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
