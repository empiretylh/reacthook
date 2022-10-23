import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import database from "../services/database";

export default function Home() {
  const products = useQuery(["products"], database.getProducts);
  const category = useQuery(["category"], database.getCategorys);
  const sales = useQuery(["sales"], database.getSales);
  const expense = useQuery(["expense"], database.getExpense);
  const profile = useQuery(["profile"], database.getProfile);

  if (products.isLoading) return "Loading...";

  if (products.error) return "An error has occurred: " + products.error.message;

  console.log(products.datadata);

  console.log("render");

  return (
    <React.Fragment>
      <section className="home">
        <h1>Dashboard</h1>
        <Container fluid>
          <Row>
            <Col>
              <div className="f-tabs one">
                <h2>Sales</h2>
                <h3>50,000 MMK</h3>
              </div>
            </Col>
            <Col>
              <div className="f-tabs two">
                <h2>Expense</h2>
                <h3>50,000 MMK</h3>
              </div>
            </Col>
            <Col>
              <div className="f-tabs three">
                <h2>Purchase</h2>
                <h3>50,000 MMK</h3>
              </div>
            </Col>
            <Col>
              <div className="f-tabs four">
                <h2>Products Balance Amount</h2>
                <h3>50,000 MMK</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
