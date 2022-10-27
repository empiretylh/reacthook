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
import { Boxes, CloudArrowUp, Search, XCircle } from "react-bootstrap-icons";

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
      console.log("Success");
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

  return (
    <React.Fragment>
      <section className="category noselect">
        <div className="title">
          <Boxes size={50} color={"#000"} />
          <h1 className="noselect">Category</h1>
        </div>
        <Container className={"category-container"}>
          <Row>
            <Col>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addCategory.mutate({
                    title: addCategoryText.current,
                  });
                }}
                style={{ position: "sticky" }}
              >
                <Form.Group className="mb-3" controlId="category-control">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Type Category Here"
                    required
                    ref={categorytextfield}
                    onChange={(e) => (addCategoryText.current = e.target.value)}
                  />
                  <Button type="submit" style={{ width: "100%" }}>
                    Add Category
                  </Button>
                  <Form.Text>Click Button Or Enter</Form.Text>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search Category Here"
                  onChange={(e) => {
                    setSearchCategoryText(e.target.value);
                  }}
                />
              </InputGroup>

              <Table
                striped
                bordered
                hover
                style={{ backgroundColor: "white" }}
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {categorydata &&
                    categorydata.map((item, index) => (
                      <tr>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td>{item.title}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        {infoshow && (
          <div className="success-info">
            <CloudArrowUp size={30} />
            <h6>Successfully Added Category</h6>
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
