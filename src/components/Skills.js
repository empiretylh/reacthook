/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import html5 from "../assets/skills/html5.svg";
import django from "../assets/skills/django.svg";
import java from "../assets/skills/java.svg";
export default function Skills() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="skill" id="skill">
      <Container>
        <Row>
          <Col>
            <div className="skill-bx">
              <h2>Skills</h2>
              <p>
                {" "}
                Lorem Ipsum is simply dumpy text of the priniting and typesting
                industry.<br></br> Lorem Ipsum is simply dumpy text of the
                priniting and typesting industry.
              </p>
              <Carousel
                responsive={responsive}
                infinte={true}
                className={"skill-slider"}
              >
                <div className={"item"}>
                  <img
                    src={html5}
                    alt={"Image"}
                    style={{ width: 50, height: 50 }}
                  />
                  <h5>Web Development</h5>
                </div>
                <div className={"item"}>
                  <img
                    src={require("../assets/skills/android.png")}
                    alt={"Image"}
                  />
                  <h5>Android Development</h5>
                </div>
                <div className={"item"}>
                  <img
                    src={require("../assets/skills/program.png")}
                    alt={"Image"}
                  />
                  <h5>Backend</h5>
                </div>
                <div className={"item"}>
                  <img src={django} alt={"Image"} />
                  <h5>Python Django</h5>
                </div>
                <div className={"item"}>
                  <img src={java} alt={"Image"} />
                  <h5>Java</h5>
                </div>
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
