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
import SelectedContext from '../context/SelectedContext';
import AddToCart from "../extra/addtocart";

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
    if (products.data) {
      return products.data.data.filter(
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
    }
  }, [SearchProductText, products.data, Choose_Category]);

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



  const ProductItem = ({item}) => {
    return (
      <div className="sales-productItem">
          <img
            src={
              item.pic
                ? axios.defaults.baseURL + item.pic
                : "https://static.thenounproject.com/png/101825-200.png"
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "https://static.thenounproject.com/png/101825-200.png";
            }}
          />
          
            <h5>{item.name}</h5>
            <h6 className={"price-text"}>{numberWithCommas(item.price)}</h6>
          <div>
           <p>Price {item.price}</p>
            <AddToCart item={item}/>
          </div>
        
        <p className={"qty-text"}>{item.qty}</p>
      </div>
    );
  };

 

 

  const [editModal, setEditModal] = useState(false);

  const editModalClose = () => {
    setEditModal(false);
    setPauseDataFetching(true);
  };

  function Edit_Product_Modal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {epdata !== null ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Product {epdata.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (eCategory.current !== 0) {
                    PutProductsToServer();
                  } else {
                    alert("Please Select Category");
                  }
                }}
              >
                <Form.Group className="mb-3" controlId="category-control">
                  <Form.Label>Products Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Products Name"
                    required
                    defaultValue={epdata.name}
                    onChange={(e) => (eProductsText.current = e.target.value)}
                  />
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    defaultValue={epdata.category}
                    onChange={(e) => (eCategory.current = e.target.value)}
                  >
                    <option value={0}>Select Category</option>
                    {category.data &&
                      category.data.data.map((item, index) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </Form.Select>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="Price"
                    defaultValue={epdata.price}
                    required
                    onChange={(e) => (ePrice.current = e.target.value)}
                  />
                  <Form.Label>Qty</Form.Label>
                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="Quantity"
                    defaultValue={epdata.qty}
                    required
                    onChange={(e) => (eQuantity.current = e.target.value)}
                  />
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="mb-3"
                    placeholder="Description"
                    defaultValue={
                      epdata.description === "undefined"
                        ? ""
                        : epdata.description
                    }
                    onChange={(e) => (eDescription.current = e.target.value)}
                  />
                  <Form.Label>Add Products Image</Form.Label>
                  <Form.Control
                    type="file"
                    className="mb-3"
                    placeholder="Add Image"
                    accept=".png,.jpg,.jpeg,.webp"
                    onChange={(e) =>
                      (eProductsImage.current = e.target.files[0])
                    }
                  />
                  <Button type="submit" style={{ width: "100%" }}>
                    Update Product
                  </Button>
                  <Form.Text>Click Button Or Enter</Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </>
        ) : null}
      </Modal>
    );
  }

  const textForm = useRef(0);

  const [selectValue,setSelectValue] = useState([]);

  const valueProvider = useMemo(()=>({selectValue,setSelectValue}),[selectValue,setSelectValue])

  return (
    <SelectedContext.Provider value={valueProvider}>      
      <section className="products noselect">
        <Edit_Product_Modal show={editModal} onHide={editModalClose} />
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
            <Col md={7} lg={9} xl={8}>
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
                {products.data &&
                  productsdata.map((item, index) =>(
                    <ProductItem item={item} key={index}/>
                    ))}
              </div>
            </Col>
            <Col md={5} lg={3} xl={4}>
              
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
