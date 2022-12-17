/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useReducer,
} from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import database from "../services/database";
import { PICTURE as pic } from "../../assets/assets";
import Button from "react-bootstrap/Button";
import { Pie, Column, Area } from "@ant-design/plots";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SelectedContext from "../context/SelectedContext";
import AddToCart from "../extra/addtocart";
import ProductItems from "../extra/ProductItems";

import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  Bag,
  Boxes,
  Cart,
  CloudArrowUp,
  Search,
  XCircle,
} from "react-bootstrap-icons";

import axios from "axios";

String.prototype.replaceAllTxt = function replaceAll(search, replace) {
  return this.split(search).join(replace);
};

const numberWithCommas = (x = 0) => {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
};

function dataReducer(state, action) {
  switch (action.type) {
    case "add":
      // Add the new item to the array
      return [...state, action.item];
    case "update":
      // Find the item in the array with the matching id
      const item = state.find((item) => item.id === action.id);
      // If the item was found, update its value
      if (item) {
        return state.map((i) => (i === item ? action.item : i));
      }
      return state;
    case "delete":
      // const item = state.find((a) => a.id === action.id);
      // If the item was found, update its value
      console.log('Deleteing')
      return state.filter((i) => i.id !== action.id);
      
    default:
      return state;
  }
}

export default function Sales() {
  const [pauseDataFetching, setPauseDataFetching] = useState(true);

  const products = useQuery(["products"], database.getProducts, {
    enabled: pauseDataFetching,
  });
  const category = useQuery(["category"], database.getCategorys, {
    enabled: pauseDataFetching,
  });

  const [SearchCategoryText, setSearchCategoryText] = useState("");

  const [SearchProductText, setSearchPrdouctText] = useState("");

  const queryClient = useQueryClient();

  const addCategoryText = useRef("");

  const categorytextfield = useRef("");

  const [infoshow, setInfoShow] = useState(false);
  const [infotext, setInfoText] = useState("Successfully Uploaded");

  const [Choose_Category, setChoose_Category] = useState("All");

  const ProductsText = useRef(0);
  const Category = useRef(0);
  const Price = useRef(0);
  const Quantity = useRef(0);
  const Description = useRef(0);
  const ProductsImage = useRef(0);

  // e means Edit Products
  const eProductsText = useRef(0);
  const eCategory = useRef(0);
  const ePrice = useRef(0);
  const eQuantity = useRef(0);
  const eDescription = useRef(0);
  const eProductsImage = useRef(0);

  const [epdata, setEditProductData] = useState(null);
  const [cartSearchText, setCartSearchText] = useState("");

  const [selectValue, setSelectValue] = useState([]);

  const [selectData, dispatch] = useReducer(dataReducer, []);

  const handleAdd = (item) => {
    dispatch({ type: "add", item });
  };

  // Update an existing item in the data array
  const handleUpdate = (id, item) => {
    dispatch({ type: "update", id, item });
  };

   const handleDelete = (id) => {
    dispatch({ type: "delete",id});
  };

  useEffect(() => {
    if (epdata !== null) {
      eProductsText.current = epdata.name;
      eCategory.current = epdata.category;
      ePrice.current = epdata.price;
      eQuantity.current = epdata.qty;
      eDescription.current = epdata.description;
    }
  }, [epdata]);

  const addCategory = useMutation(database.postCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);

      categorytextfield.current.value = null;

      setInfoShow(true);
      setTimeout(() => setInfoShow((prev) => !prev), 6000);
    },

    onMutate: () => {
      setInfoShow(false);
    },
  });

  const productsdata = useMemo(() => {
    console.log('We Chagend')
    if (products.data) {
      const first = products.data.data.filter(
        (item) => {
          return (
            (Choose_Category === "All"
              ? true
              : item.category === Choose_Category) &&
            item.name
              .replaceAllTxt(" ", "")
              .toLowerCase()
              .includes(SearchProductText.replaceAllTxt(" ", "").toLowerCase())
          );
        }
        // console.log(item)
      );
      // return first;
      if (selectData) {
        const second = first.filter(
          (a) => !selectData.map((d) => d.id).includes(a.id)
        );
        return second;
      } else {
        return first;
      }
    }
  }, [SearchProductText, products.data, Choose_Category,selectData]);

  const categorydata = useMemo(() => {
    if (category.data) {
      return category.data.data.filter(
        (item) =>
          item.title
            .replaceAllTxt(" ", "")
            .toLowerCase()
            .includes(SearchCategoryText.replaceAllTxt(" ", "").toLowerCase())
        // console.log(item)
      );
    }
  }, [SearchCategoryText, category.data]);

  const IdToCategoryText = (id) => {
    if (category.data) {
      const cat = category.data.data.filter((item) => item.id === id);

      return cat[0].title;
    }
  };

//   const ProductItem = React.memo( ({ item }) => {
//     return (
//       <div className="sales-productItem">
//         <img
//           src={
//             item.pic && item.pic === "/media/null" || item.pic ==='null'|| item.pic === null 
//               ? "https://static.thenounproject.com/png/101825-200.png":
//               axios.defaults.baseURL + item.pic
//           }
//           onError={({ currentTarget }) => {
//             currentTarget.src =
//               "https://static.thenounproject.com/png/101825-200.png";
//           }}
//         />
// 
//         <h5>{item.name}</h5>
//         <h6 className={"price-text"}>{numberWithCommas(item.price)}</h6>
//         <div>
//           <p>Price {item.price}</p>
//           <AddToCart item={item} />
//         </div>
// 
//         <p className={"qty-text"}>{item.qty}</p>
//       </div>
//     );
//   });

  const [editModal, setEditModal] = useState(false);

  const editModalClose = () => {
    setEditModal(false);
    setPauseDataFetching(true);
  };

  const textForm = useRef(0);

  const valueProvider = useMemo(
    () => ({ selectValue, setSelectValue,handleAdd,selectData}),
    [selectValue, setSelectValue]
  );

  const SetValue = (value, id) => {
    let cartdata = [...selectData];
    let index = cartdata.findIndex((it) => it.id === id);
    if (value === 0) {
     handleDelete(id);
    } else {
      cartdata[index] = {
        ...cartdata[index],
        ["qty"]: parseInt(value) || 1,
      };
      cartdata[index] = {
        ...cartdata[index],
        ["total"]: cartdata[index].price * cartdata[index].qty,
      };

      handleUpdate(id,cartdata[index])
    }

    console.log(cartdata, "whatthefuck");

    // setSelectValue(cartdata);
  };

  const cartData = useMemo(() => {
    
    return selectData;
  }, [selectData]);

  const totalCartAmount = useMemo(() => {
    let total = 0;
    if (selectData) {
      selectData.map((item, index) => {
        total += parseInt(item.total);
      });

      return total;
    }
  }, [selectData]);

  return (
    <SelectedContext.Provider value={valueProvider}>
      <section className="products noselect">
        <Container fluid className="noselect products">
          <Row>
            <Col lg={12}>
              <div
                className="noselect"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Cart size={30} color="#000" />
                <h4 style={{ marginTop: 5, marginLeft: 5 }}>Sales</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={7} xl={7}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search Products Here"
                  onChange={(e) => {
                    setSearchPrdouctText(e.target.value);
                  }}
                />
              </InputGroup>
              <div className={"category-item"}>
                <div
                  className={Choose_Category === "All" ? "active" : null}
                  onClick={() => setChoose_Category("All")}
                >
                  <h6>All</h6>
                </div>
                {category.data &&
                  category.data.data.map((item, index) => (
                    <div
                      key={index}
                      className={Choose_Category === item.id ? "active" : null}
                      onClick={() => setChoose_Category(item.id)}
                    >
                      <h6>{item.title}</h6>
                    </div>
                  ))}
              </div>
              <div className={"sales-products-items"}>
              {products.data && <ProductItems items={productsdata}/>}
              </div>
            </Col>
            <Col md={6} lg={5} xl={5}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
              <Form.Control
                  type="text"
                  placeholder="Customer Name"
                  onChange={(e) => {
                    setSearchPrdouctText(e.target.value);
                  }}
                />
                <h6>Total Amount : {numberWithCommas(totalCartAmount)}</h6>
              </div>
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th style={{ minWidth: 100 }}>Name</th>

                      <th style={{ maxWidth: 60, minWidth: 60 }}>Qty</th>
                      <th style={{ minWidth: 100 }}>Total</th>
                      <th style={{ minWidth: 20 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData &&
                      cartData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>

                          <td>
                            <Form.Control
                              type="number"
                              placeholder="Qty"
                              value={item.qty}
                              autoFocus={true}
                              onClick={(e) => e.target.select()}
                              onFocus={(e) => {
                                console.log(e, "selectfocuess");
                                e.target.select();
                              }}
                              onChange={(e) =>
                                SetValue(e.target.value, item.id)
                              }
                            />
                          </td>
                          <td>{numberWithCommas(item.total)}</td>
                          <td>
                            <h4
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: 5,
                                textAlign: "center",
                                borderRadius: 50,
                              }}
                              onClick={(e) => SetValue(0, item.id)}
                            >
                              -
                            </h4>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>

        {infoshow && (
          <div className="success-info">
            <CloudArrowUp size={30} />
            <h6>{infotext}</h6>
            <XCircle
              size={25}
              style={{ position: "absolute", right: 10 }}
              onClick={() => setInfoShow(false)}
            />
          </div>
        )}
      </section>
    </SelectedContext.Provider>
  );
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
};
