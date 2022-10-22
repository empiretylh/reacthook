/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect} from "react";
import "../App.css";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Skills from "../components/Skills";
import { Container, Row, Col } from "react-bootstrap";

export default function Portfolio() {

  useEffect(()=>{
  
  })


  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
     
      </div>
  );
}
