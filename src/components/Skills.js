import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import html5 from "../assets/skills/html5.svg";
import django from "../assets/skills/django.svg";
import java from "../assets/skills/java.svg";

import python from '../assets/skills/python.svg';
import javascript from '../assets/skills/javascript.svg';
import css3 from '../assets/skills/css3.svg';

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


  useEffect(()=>{
   

  })


  return (
    <section className="skill" id="skill">
      <Container>
        <Row>
          <Col>
            <div className="skill-bx">
              <h2>Skills</h2>
              <p>
                Lorem Ipsum is simply dumpy text of the priniting and typesting
                industry.<br></br> Lorem Ipsum is simply dumpy text of the
                priniting and typesting industry.
              </p>
            </div>
          </Col>
            <Col>
            <div className="skill-range">
            <img src={html5} alt='html'/>
            <h3>HTML</h3>
                <input type="range" value={60} max={100} min={0} />
                <img src={css3} alt='html'/>
                <h3>CSS</h3>
                <input type="range" value={50} max={100} min={0} />
                <img src={javascript} alt='html'/>
                <h3>Javascript</h3>
                <input type="range" value={80} max={100} min={0} />
                <img src={python} alt='html'/>
                <h3>Python</h3>
                <input type="range" value={80} max={100} min={0} />
                <img src={java} alt='html'/>
                <h3>Java</h3>
                <input type="range" value={90} max={100} min={0} />
            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
}