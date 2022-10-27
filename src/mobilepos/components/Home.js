import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import database from "../services/database";
import { PICTURE as pic } from "../../assets/assets";
import Button from "react-bootstrap/Button";
import { Pie, Column, Area } from "@ant-design/plots";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
const numberWithCommas = (x = 0) => {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
};

export default function Home() {
  const products = useQuery(["products"], database.getProducts);
  const category = useQuery(["category"], database.getCategorys);
  const sales = useQuery(["sales"], database.getSales);
  const expense = useQuery(["expense"], database.getExpense);
  const purchase = useQuery(["purchase"], database.getPurchase);
  const profile = useQuery(["profile"], database.getProfile);

  const toproduct = useQuery(["topProducts"], database.getTopProduct);

  const profitdata = useQuery(["profitdata"], database.getProfitnLoss);

  const productsdata = products.data ? products.data.data : null;

  const [radioValue, setRadioValue] = useState("today");

  const radios = [
    { name: "Today", value: "today" },
    { name: "This Month", value: "month" },
    { name: "This Year", value: "year" },
  ];

  let salesReport = useQuery(
    ["customsales", "DT", radioValue],
    database.getSales
  );

  useEffect(() => {
    console.log("Refetching sales Report");

    salesReport.refetch();
  }, [radioValue]);

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

  const BarChartCompute = useMemo(() => {
    if (salesReport.data) {
      let barchartdata = [];
      for (var [k, v] of Object.entries(salesReport.data.data.CHART)) {
        barchartdata.push({
          time: k,
          price: v,
        });
      }
      return barchartdata;
    }
  }, [salesReport.data]);

  const ProfitChartCompute = useMemo(() => {
    if (profitdata.data) {
      let data = profitdata.data.data;

      let result = [];
    
      for (var [k, v] of Object.entries(data.addData)) {
       
        result.push({
          date:k,
          price:v,
          type:'Income'
        })

      }

      for (var [k, v] of Object.entries(data.minusData)) {
       
        result.push({
          date:k,
          price:v,
          type:'Expense'
        })

      }

      return result;
      // data.addData.forEach((item,index)=> console.log(item));
    }
  }, [profitdata.data]);

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

  const BarChartConfig = useMemo(() => {
    return {
      data: BarChartCompute,
      xField: "time",
      yField: "price",
      color: "#5B8FF9",
      label: {
        position: "middle",
        // 'top', 'bottom', 'middle',

        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
    };
  }, [BarChartCompute]);

  const ProfitChartConfig = useMemo(()=>{
    return  {
      data:ProfitChartCompute,
      xField: 'date',
      yField: 'price',
      seriesField: 'type',
      color: ['#2ca02c','#d62728'],
    };
  },[ProfitChartCompute])

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
              <h5>Top Get Money Products</h5>
              <div className={"limit-height-table"}>
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
                        <tr>
                          <td >{index + 1}</td>
                          <td>{item.type}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h5>Top Customer</h5>
              <div className={"limit-height-table"}>
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
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommas(item.price)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className={"main-pie-chart"}>
              <h5>Another Pie Chart Data May be later</h5>
              {PieChartDataCompute && <Pie {...config} />}
            </Col>
          </Row>
          <Row className="show-detail-data">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Sales Reoprt</h5>
            </div>
            <Col sm={12} md={6} lg={4}>
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
              <div className={"limit-height-table"}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Time</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesReport.data &&
                      Object.entries(salesReport.data.data.CHART).map(
                        (item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item[0]}</td>
                            <td style={{ textAlign: "right" }}>
                              {numberWithCommas(item[1])}
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col lg={8} md={6} sm={12} className={"main-pie-chart"}>
              {salesReport.data && <Column {...BarChartConfig} />}
            </Col>
          </Row>
          <Row className="show-detail-data">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Profit & Loss</h5>
            </div>
            <Col sm={12} md={6} lg={12}>
              {profitdata.data && <Area {...ProfitChartConfig}/>}
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
