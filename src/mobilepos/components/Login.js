import React, { Component, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authService from "../services/auth.service";
import axios from 'axios';
export default function Login() {
  const username = useRef(0);
  const password = useRef(0);

  const onLogin = (e) => {
    e.preventDefault();
    console.log(username.current, password.current);
    // authService.admin();
    axios.defaults.headers.common = {
      Authorization: null,
    };
     authService.login(username.current, password.current);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Username"
          onChange={(e) => (username.current = e.target.value)}
        />
        <Form.Text className="text-muted">Don't Space between text.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => (password.current = e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onLogin}>
        Submit
      </Button>
    </Form>
  );
}
