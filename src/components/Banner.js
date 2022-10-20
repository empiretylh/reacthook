import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImage from "../assets/i_logo.png";
import { TypeAnimation } from "react-type-animation";
const Banner = () => {
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline"> Welcome to my Portfolio</span>
            <h1>
              {`Hi I'am Thura Lin Htut`} {"\n"}
              <span className="wrap">
                <TypeAnimation
                  sequence={[
                    "Web Developer", // Types 'One'
                    1000, // Waits 1s
                    "FullStack", // Deletes 'One' and types 'Two'
                    1000, // Waits 2s
                    "Android Developer",
                    1000,
                    "UI/UX Designer",
                    () => {
                      console.log("Done typing!"); // Place optional callbacks anywhere in the array
                    },
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  style={{ fontSize: "1em" }}
                />
              </span>
            </h1>
            <p>
              Lorem Ipsum is simply dumpy text of the priniting and typesting
              industry.
            </p>
            <button onClick={() => console.log("connect")}>
              Let's Connect
              <ArrowRightCircle size={25} />
            </button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImage} alt="Header Img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Banner;
