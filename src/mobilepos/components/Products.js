/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row, Container, Table, Form, InputGroup } from "react-bootstrap";
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

export default function Home() {
  const products = useQuery(["products"], database.getProducts);
  const category = useQuery(["category"], database.getCategorys);

  const [SearchCategoryText, setSearchCategoryText] = useState("");

  const queryClient = useQueryClient();

  const addCategoryText = useRef("");

  const categorytextfield = useRef("");

  const [infoshow, setInfoShow] = useState(false);

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

  products.data && console.log("products", products.data.data);

  const IdToCategoryText =  ()=>{
    
  }

  const ProductItem = (item) => {
    return (
      <div className="productItem">
        <img
          src={
            ! item.pic.includes("null")
              ? axios.defaults.baseURL + item.pic
              : "https://static.thenounproject.com/png/101825-200.png"
          }
          
        />
        <div>
          <h5>{item.name}</h5>
           <h5>{item.category}</h5>
            <h5>{numberWithCommas(item.price)}</h5>
             <h5>{item.qty}</h5>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <section className="products noselect">
        <Container className="noselect">
          <Row>
            <Col lg={12}>
              <div
                className="noselect"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Bag size={30} color="#000" />
                <h4 style={{ marginTop: 5, marginLeft: 5 }}>Products</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search Products Here"
                  onChange={(e) => {
                    setSearchCategoryText(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                {products.data && products.data.data.map((item,index)=>ProductItem(item))}
              </div>
            </Col>
          </Row>
        </Container>
        {infoshow && (
          <div className="success-info">
            <CloudArrowUp size={30} />
            <h6>Successfully Added</h6>
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
