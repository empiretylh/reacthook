import React, { Component, useMemo } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import database from "../services/database";
import { PICTURE as pic } from "../../assets/assets";
export default function Home() {
  const products = useQuery(["products"], database.getProducts);
  const category = useQuery(["category"], database.getCategorys);
  const sales = useQuery(["sales"], database.getSales);
  const expense = useQuery(["expense"], database.getExpense);
  const profile = useQuery(["profile"], database.getProfile);

  const ComputeSales = useMemo(() => {
    let price = 0;
    if (sales.data) {
      sales.data.data.DATA.forEach((e) => {
        var g_price = parseInt(e.grandtotal);
        price += g_price;
      });
    
    }
    return price;
  }, [sales.data]);

  if (products.isLoading) return "Loading...";

  if (products.error) return "An error has occurred: " + products.error.message;

  return (
    <React.Fragment>
      <section className="home">
        <h1>Dashboard</h1>
        <Container fluid>
          <Row>
            <Col>
              <div className="f-tabs one">
                <img src={pic.sales} alt="sales" />
                <div>
                  <h2>Sales</h2>
                  <h3>{ComputeSales}</h3>
                </div>
              </div>
            </Col>
            <Col>
              <div className="f-tabs two">
                <img src={pic.expense} alt="expense" />
                <div>
                  <h2>Expense</h2>
                  <h3>50,000 MMK</h3>
                </div>
              </div>
            </Col>
            <Col>
              <div className="f-tabs three">
                <img src={pic.purchase} alt="purchase" />
                <div>
                  <h2>Purchase</h2>
                  <h3>50,000 MMK</h3>
                </div>
              </div>
            </Col>
            <Col>
              <div className="f-tabs four">
                <img src={pic.pdblance} alt="pdbalance" />
                <div>
                  <h2>Products Balance Amount</h2>
                  <h3>50,000 MMK</h3>
                </div>
              </div>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
