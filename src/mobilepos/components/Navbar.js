/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { PICTURE as p } from "../../assets/assets";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" expand="sm">
      <Container>
        <Navbar.Brand href="#home" className="navbar-band">
          <img
            src={p.logo}
            style={{ width: 50, height: 50, resize: "contain" }}
          />
          <h2>Mobile POS</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" className="nav-link active">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/login" className="nav-link">Login</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
