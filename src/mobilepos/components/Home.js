import React, { Component, useMemo, useState } from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import database from "../services/database";
import { PICTURE as pic } from "../../assets/assets";
import Button from "react-bootstrap/Button";
import { Pie } from "@ant-design/plots";
const numberWithCommas = (x = 0) => {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" MMK");
};

export default function Home() {
  const products = useQuery(["products"], database.getProducts);
  const category = useQuery(["category"], database.getCategorys);
  const sales = useQuery(["sales"], database.getSales);
  const expense = useQuery(["expense"], database.getExpense);
  const purchase = useQuery(["purchase"], database.getPurchase);
  const profile = useQuery(["profile"], database.getProfile);

  const toproduct = useQuery(["topProducts"], database.getTopProduct);

  const productsdata = products.data ? products.data.data : null;

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

  const ComputeExpense = useMemo(() => {
    let price = 0;
    if (expense.data) {
      return expense.data.data.CHART_DATA.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
    }

    return price;
  }, [expense.data]);

  const ComputeProducts = useMemo(() => {
    let price = 0;
    if (products.data) {
      products.data.data.forEach((item, index) => {
        price += item.price * item.qty;
      });
    }

    return price;
  }, [products.data]);

  const ComputePurchase = useMemo(() => {
    let price = 0;
    if (purchase.data) {
      return purchase.data.data.CHART_DATA.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
    }

    return price;
  }, [purchase.data]);

  const PieChartDataCompute = useMemo(() => {
    if (toproduct.data) {
      let arrcount = 0;
      let data = toproduct.data.data.T_Freq;

      for (let p in data) {
        arrcount += 1;
      }

      let T_Freq = [];
      let count = 0;
      for (var [k, v] of Object.entries(data)) {
        count += 1;
        T_Freq.push({
          type: k,
          value: (parseInt(v) / arrcount) * 100,
          price: toproduct.data.data.T_Money[k],
        });
        if (count === 4) {
          break;
        }
      }
      return T_Freq;
    }
  }, [toproduct.data]);

  const config = useMemo(() => {
    return {
      autofit: true,
      appendPadding: 4,
      data: PieChartDataCompute,
      angleField: "value",
      colorField: "type",
      radius: 0.9,
      label: {
        type: "inner",
        offset: "-30%",
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 15,
          textAlign: "center",
        },
      },
      interactions: [
        {
          type: "element-active",
        },
      ],
    };
  }, [PieChartDataCompute]);

  if (products.isLoading) return "Loading...";

  if (products.error) return "An error has occurred: " + products.error.message;

  return (
    <React.Fragment>
      <section className="home">
        <h1 className="noselect">Dashboard</h1>
        <Container fluid>
          <Row>
            <Col>
              <div className="f-tabs one noselect">
                <img src={pic.sales} alt="sales" />
                <div>
                  <h2>Sales</h2>
                  <h3>{numberWithCommas(ComputeSales)}</h3>
                </div>
              </div>
            </Col>
            <Col>
              <div className="f-tabs two noselect">
                <img src={pic.expense} alt="expense" />
                <div>
                  <h2>Expense</h2>
                  <h3>{numberWithCommas(ComputeExpense)}</h3>
                </div>
              </div>
            </Col>
            <Col>
              <div className="f-tabs three noselect">
                <img src={pic.purchase} alt="purchase" />
                <div>
                  <h2>Purchase</h2>
                  <h3>{numberWithCommas(ComputePurchase)}</h3>
                </div>
              </div>
            </Col>
            <Col>
              <div className="f-tabs four noselect">
                <img src={pic.pdblance} alt="pdbalance" />
                <div>
                  <h2>Balance Amount</h2>
                  <h3>{numberWithCommas(ComputeProducts)}</h3>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {productsdata &&
            productsdata.filter((item) => item.qty <= 0).length <= 0 ? null : (
              <Col xs="12" lg="3" className={"noti-column"}>
                <Button
                  variant="danger"
                  style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: 15,
                    margin: 2,
                  }}
                >
                  {productsdata.filter((item) => item.qty <= 0).length} Products
                  are out of stocks
                </Button>
              </Col>
            )}
            {productsdata &&
            productsdata.filter((item) => item.qty <= 10).length <= 0 ? null : (
              <Col xs="12" lg="4" className={"noti-column"}>
                <Button
                  variant="warning"
                  style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: 15,
                    margin: 2,
                  }}
                >
                  {productsdata.filter((item) => item.qty <= 10).length}{" "}
                  Products are less than 10 qty
                </Button>
              </Col>
            )}
          </Row>
          <Row className="show-detail-data">
            <Col sm={12} md={6} lg={4}>
              <h5>Top get Money Products</h5>

              <table cellspacing="0" cellpadding="0" border="0" width="325">
                <tr>
                  <td>
                    <table
                      cellspacing="0"
                      cellpadding="1"
                      border="1"
                      width="300"
                    >
                      <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{ width: "100%", height: 80, overflow: "auto" }}
                    >
                      <table
                        cellspacing="0"
                        cellpadding="1"
                        border="1"
                        width="300"
                      >
                        <tr>
                          <td>new item</td>
                          <td>new item</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </Col>
            <Col>
              <h5>Top get Money Products</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Products Name</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PieChartDataCompute &&
                    PieChartDataCompute.map((item, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                        </tr>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                        </tr>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                        </tr>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                        </tr>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </Table>
            </Col>
            <Col lg={4}>
              <h5>Top Sales Products</h5>
              {PieChartDataCompute && <Pie {...config} />}
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
