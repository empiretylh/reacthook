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
import {
  Bag,
  Boxes,
  CloudArrowUp,
  Search,
  Wallet,
  XCircle,
} from "react-bootstrap-icons";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

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

export default function Expense() {
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

  const ProductItem = (item) => {
    return (
      <div className="productItem">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={
              !item.pic.includes("null")
                ? axios.defaults.baseURL + item.pic
                : "https://static.thenounproject.com/png/101825-200.png"
            }
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5>{item.name}</h5>
            <p className={"category-text"}>{IdToCategoryText(item.category)}</p>
            <h6 className={"price-text"}>{numberWithCommas(item.price)}</h6>
          </div>
        </div>
        <div className={"product-control"}>
          <Button variant="success">Add Qty</Button>
          <Button
            variant="dark"
            onClick={() => {
              setEditModal(true);
              setEditProductData(item);
              setPauseDataFetching(false);
            }}
          >
            Edit Product
          </Button>
          <Button variant="danger">Delete Product</Button>
        </div>
        <p className={"qty-text"}>{item.qty}</p>
      </div>
    );
  };

  const postProduct = useMutation(database.postProduct, {
    onSuccess: () => {
      console.log("Finished");
      queryClient.invalidateQueries(["products"]);
      textForm.current.reset();
      setInfoText("SuccessFully Added New Product");
      setInfoShow(true);
      setTimeout(() => setInfoShow((prev) => !prev), 6000);
    },

    onMutate: () => {
      setInfoShow(false);
    },
  });

  const putProduct = useMutation(database.putProduct, {
    onSuccess: () => {
      console.log("Finished");
      queryClient.invalidateQueries(["products"]);
      setInfoText("SuccessFully Updated Products");
      setInfoShow(true);
      setPauseDataFetching(true);
      setTimeout(() => setInfoShow((prev) => !prev), 6000);
    },

    onMutate: () => {
      setInfoShow(false);
    },
  });

  const PostProductsToServer = () => {
    const d = new FormData();
    d.append("name", ProductsText.current);
    d.append("qty", Quantity.current);
    d.append("price", Price.current);
    d.append("category", Category.current);
    d.append("description", Description.current);
    d.append("pic", ProductsImage.current !== 0 ? ProductsImage.current : null);

    console.log(d.entries);
    ProductsImage.current = 0;

    postProduct.mutate(d);
  };

  const PutProductsToServer = () => {
    const d = new FormData();
    d.append("id", epdata.id);
    d.append("name", eProductsText.current);
    d.append("qty", eQuantity.current);
    d.append("price", ePrice.current);
    d.append("category", eCategory.current);
    d.append("description", eDescription.current);
    d.append(
      "pic",
      eProductsImage.current !== 0 ? eProductsImage.current : null
    );

    console.log(d.entries);

    putProduct.mutate(d);
    eProductsImage.current = 0;

    setEditModal(false);
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

  const options = ["Bills", "ဖုန်းဘေလ်"];

  return (
    <React.Fragment>
      <section className="expense noselect">
        {/* <Edit_Product_Modal show={editModal} onHide={editModalClose} /> */}
        <Container fluid className="noselect expense">
          <Row>
            <Col lg={12}>
              <div
                className="noselect"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Wallet size={30} color={"#000"} />
                <h4 style={{ marginTop: 5, marginLeft: 5 }}>Expense</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={5} lg={4} xl={3}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (Category.current !== 0) {
                    PostProductsToServer();
                  } else {
                    alert("Please Select Category");
                  }
                }}
                ref={textForm}
              >
                <Form.Group className="mb-3" controlId="category-control">
                  <Form.Label>Title</Form.Label>
                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    // onChange={setSingleSelections}
                    options={options}
                    placeholder="Choose a state..."
                    // selected={singleSelections}
                  />
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="Price"
                    required
                    onChange={(e) => (Price.current = e.target.value)}
                  />

                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="mb-3"
                    placeholder="Description"
                    onChange={(e) => (Description.current = e.target.value)}
                  />

                  <Button type="submit" style={{ width: "100%" }}>
                    Add Expense
                  </Button>
                  <Form.Text>Click Button Or Enter</Form.Text>
                </Form.Group>
              </Form>
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
    </React.Fragment>
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
