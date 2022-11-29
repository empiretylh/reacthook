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
  useContext,
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
 CurrencyDollar,
  Wallet,
  XCircle,
} from "react-bootstrap-icons";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import LoadingContext from "../context/LoadingContext";

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

export default function OtherIncome() {
  const [pauseDataFetching, setPauseDataFetching] = useState(true);

  const { loading, setLoading, loadingText, setLoadingText } =
    useContext(LoadingContext);

  const [radioValue, setRadioValue] = useState("today");
  const expense = useQuery(["expense", radioValue], database.getOtherIncome, {
    enabled: pauseDataFetching,
  });

  const [searchText, setSearchText] = useState("");
 

  const queryClient = useQueryClient();
 
  const [infoshow, setInfoShow] = useState(false);
  const [infotext, setInfoText] = useState("Successfully Uploaded");



  const textRef = useRef(0);
  const text = useRef(0);
  const dateRef = useRef(0);
  const Price = useRef(0);
  const Description = useRef(0);

  const [epdata, setEpdata] = useState(null);

  const [editModal, setEditModal] = useState(false);

  const editModalClose = () => {
    setEditModal(false);
    setPauseDataFetching(true);
  };

  const AddExpenseToServer = useMutation(database.postOtherIncome, {
    onSuccess: () => {
      queryClient.invalidateQueries(["expense"]);
      console.log("Expense Successfully Added");
      setInfoText("SuccessFully Added");
      setInfoShow(true);
      setTimeout(() => setInfoShow((prev) => !prev), 6000);
      textRef.current = 0;
      dateRef.current = 0;
      Price.current = 0;
      Description.current = 0;

      text.current.clear();
      textForm.current.reset();
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
      console.log("Mutating...");
      setInfoShow(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const putExpenseToServer = useMutation(database.putOtherIncome, {
    onSuccess: () => {
      setEditModal(false);
      setPauseDataFetching(true);
      queryClient.invalidateQueries(["expense"]);
      setInfoText("SuccessFully Updated");
      setInfoShow(true);
      setTimeout(() => setInfoShow((prev) => !prev), 6000);

      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
      setInfoShow(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const DeleteExpense = useMutation(database.deleteOtherIncome, {
    onSuccess: () => {
      queryClient.invalidateQueries(["expense"]);
      setInfoText("Successfully Deleted");
      setInfoShow(true);
      setLoading(false);
      setTimeout(() => setInfoShow((prev) => !prev), 6000);
    },
    onMutate: () => {
      console.log("Mutating...");
      setInfoShow(false);
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const textForm = useRef(0);

  const expensedata = useMemo(() => {
    if (expense.data) {
      return expense.data.data.DATA.filter((i) =>
        i.title
          .toLowerCase()
          .replaceAllTxt(" ", "")
          .includes(searchText.toLowerCase().replaceAllTxt(" ", ""))
      ).reverse();
    }
    return [];
  }, [expense.data, searchText]);

  const options = [
    "အတိုး",
    "လက်ဆောင်",
    "ကုန်ပစ္စည်း တင်ချခ",
    "Commission",
    "Invesement",
  ];

  const radios = [
    { name: "Today", value: "today" },
    { name: "This Month", value: "month" },
    { name: "This Year", value: "year" },
  ];

  function Delete_Expense_Modal(props) {
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
                Delete {epdata && epdata.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <p>Are you sure want to Delete?</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  props.onHide();
                  DeleteExpense.mutate({
                    id: epdata.id,
                  });
                }}
                variant={"danger"}
              >
                Delete
              </Button>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </>
        ) : null}
      </Modal>
    );
  }

  function Edit_Expense_Modal(props) {
    const textRef = useRef(epdata && epdata.title);
    const Price = useRef(epdata && epdata.price);
    const Description = useRef(epdata && epdata.description);
    const dateRef = useRef(epdata && epdata.date);

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
                Edit {epdata && epdata.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (textRef.current && Price.current && dateRef.current) {
                    setEditModal(false);
                    putExpenseToServer.mutate({
                      id: epdata.id,
                      title: textRef.current,
                      price: Price.current,
                      date: dateRef.current,
                      description:
                        Description.current === 0 ? "" : Description.current,
                    });
                  } else {
                    alert("Please Fill Required Field");
                    console.log(
                      textRef.current,
                      Price.current,
                      dateRef.current
                    );
                  }
                }}
                ref={textForm}
              >
                <Form.Group className="mb-3" controlId="category-control">
                  <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      className="mb-3"
                      placeholder="Type OtherIncome"
                      defaultValue={textRef.current}
                      required
                      onChange={(e) => (textRef.current = e.target.value)}
                    />

                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="Price"
                    defaultValue={Price.current}
                    required
                    onChange={(e) => (Price.current = e.target.value)}
                  />
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    className="mb-3"
                    placeholder="Price"
                    defaultValue={dateRef.current}
                    required
                    onChange={(e) => (dateRef.current = e.target.value)}
                  />

                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="mb-3"
                    placeholder="Description"
                    defaultValue={Description.current}
                    onChange={(e) => (Description.current = e.target.value)}
                  />

                  <Button
                    type="submit"
                    variant="success"
                    style={{ width: "100%" }}
                  >
                    Update OtherIncome
                  </Button>
                  <Form.Text>Click Button Or Enter</Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </>
        ) : null}
      </Modal>
    );
  }

  const [deleteModal, setDeleteModal] = useState(false);

  const onDeleteModal = (item) => {
    setEpdata(item);
    setDeleteModal((prev) => !prev);
    setPauseDataFetching((prev) => !prev);
  };

  const onEditModal = (item) => {
    setEpdata(item);
    setEditModal((prev) => !prev);
    setPauseDataFetching((prev) => !prev);
  };

  const ComputeExpense = useMemo(()=>{
    let value = 0;
    if(expense.data){
      expense.data.data.DATA.map((item,index)=>{
        value += parseInt(item.price);
      })
      return value;

    }
    return value;
  },[expense.data])

  return (
    <React.Fragment>
      <section className="expense noselect">
        {/* <Edit_Product_Modal show={editModal} onHide={editModalClose} /> */}
        <Delete_Expense_Modal show={deleteModal} onHide={onDeleteModal} />
        <Edit_Expense_Modal show={editModal} onHide={editModalClose} />
        <Container fluid className="noselect expense">
          <Row>
            <Col lg={12} style={{padding:10}}>
              <div
                className="noselect"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div  style={{
                  display: "flex",
                  alignItems: "center",
                 
                }}>
                  <CurrencyDollar size={30} color={"#000"} />
                  <h4 style={{ marginTop: 5, marginLeft: 5 }}>Other Income</h4>
                </div>
                <div>
                  <h4>{numberWithCommas(ComputeExpense)}</h4>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={5} lg={4} xl={3}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (textRef.current && Price.current && dateRef.current) {
                    AddExpenseToServer.mutate({
                      title: textRef.current,
                      price: Price.current,
                      date: dateRef.current,
                      description:
                        Description.current === 0 ? "" : Description.current,
                    });
                  } else {
                    alert("Please Fill Required Field");
                    console.log(
                      textRef.current,
                      Price.current,
                      dateRef.current
                    );
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
                    placeholder="Type Or Choose OtherIncome"
                    ref={text}
                    onChange={(e) => {
                      textRef.current = e[0];
                    
                    }}
                    onInputChange={(e) => (e ? (textRef.current = e) : null)}
                  />
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="Price"
                    required
                    onChange={(e) => (Price.current = e.target.value)}
                  />
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    className="mb-3"
                    placeholder="Price"
                    required
                    onChange={(e) => (dateRef.current = e.target.value)}
                  />

                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="mb-3"
                    placeholder="Description"
                    onChange={(e) => (Description.current = e.target.value)}
                  />

                  <Button type="submit" style={{ width: "100%" }}>
                    Add OtherIncome
                  </Button>
                  <Form.Text>Click Button Or Enter</Form.Text>
                </Form.Group>
              </Form>
            </Col>
            <Col md={7} lg={8} xl={9}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search With Title"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </InputGroup>
              <div className={"time-button-group mb-2"}>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={"outline-dark"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <div className={" products-item"}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Products Name</th>
                      <th>Total Price</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expense.data &&
                      expensedata.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                          <td>{item.date}</td>
                          <td>{item.description}</td>
                          <td>
                            <div>
                              <Button
                                variant="success"
                                style={{ marginLeft: 5 }}
                                onClick={() => {
                                  onEditModal(item);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                style={{ marginLeft: 5 }}
                                onClick={() => {
                                  onDeleteModal(item);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
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
