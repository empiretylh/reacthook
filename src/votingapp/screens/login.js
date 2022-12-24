import React, { useState, useRef, useContext } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";

import services from "../data/services";
import { TokenContext } from "../context/Context";
import { useMutation } from "react-query";
const Login = () => {
  const loginSubmit = () => {
    console.log("Login Submit");
  };

  const [isRegister, setRegister] = useState(false);

  const { token, setToken } = useContext(TokenContext);

  const [modalShow,setModalShow] = useState(false);
  const [modalText,setModalText] = useState("Username Or Password is incorrect. Please try agian. If you forgot your password contact your adminstatior.");

  const r_name = useRef(0);
  const r_username = useRef(0);
  const r_email = useRef(0);
  const r_phoneno = useRef(0);
  const r_password = useRef(0);

  const l_username = useRef(0);
  const l_password = useRef(0);

  const Register = useMutation(services.register, {
    onSuccess: (e) => {
      localStorage.setItem("user_token", e.data.token);
      setToken(e.data.token);
    },
    onMutate: (e) => {
      // console.log('mutating')
    },
    onError:(e)=>{
        setModalText("Register Error, When your username is exisiting in our server, You cannot not register, So change your username to register.")
      setModalShow(true); 
   }

  });

  const LoginS = useMutation(services.login,{
    onSuccess:(e)=>{
      localStorage.setItem("user_token", e.data.token);
      setToken(e.data.token);
    },
    onMutate:(e)=>{

    },
    onError:(e)=>{
      setModalText("Username Or Password is incorrect. Please try agian. If you forgot your password contact your adminstatior.");
       setModalShow(true); 
    }
  })


  const onLoginClick = () => {

    LoginS.mutate({
      username:l_username.current.value,
      password:l_password.current.value,
    });
    // console.log(r_name.current.value)
  };


  const ONRegisterClick = () => {
    Register.mutate({
      name: r_name.current.value,
      username: r_username.current.value,
      email: r_email.current.value,
      phoneno: r_phoneno.current.value,
      password: r_password.current.value,
    });
    // console.log(r_name.current.value)
  };

  return (
    <div className="login">
      <div className="bglogin" />
      <div className="bgcovercolor" />
      <Modal show={modalShow} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
          <h4 style={{color:'red'}}>Error</h4>
          <p style={{color:'red',fontFamily: 'Roboto-Regular'}}>
          {modalText}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'danger'} onClick={e=>setModalShow(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
      <Container fluid>
        <Row>
          <Col
            md={12}
            lg={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isRegister ? (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className={"loginForm"}
              >
                <h3 style={{ color: "#000" }}>Register</h3>
                <Form.Group className="mb-3" controlId="register-control">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="username"
                    className="mb-3"
                    placeholder="Name Or Teams Name"
                    required
                    ref={r_name}
                  />
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    className="mb-3"
                    placeholder="Username"
                    required
                    ref={r_username}
                  />

                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="mb-3"
                    placeholder="Email"
                    required
                    ref={r_email}
                  />

                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="09xxxxxxxxx"
                    required
                    ref={r_phoneno}
                  />

                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="mb-3"
                    placeholder="Password"
                    required
                    ref={r_password}
                  />

                  <Button
                    type="submit"
                    variant="success"
                    style={{ width: "100%", marginBottom: 10 }}
                    onClick={ONRegisterClick}
                  >
                    Register
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ width: "100%" }}
                    onClick={() => setRegister(false)}
                  >
                    I have already an account.
                  </Button>
                </Form.Group>
              </Form>
            ) : (
              <Form
                onSubmit={(e) => {
                 e.preventDefault();
                  onLoginClick();
                }}
                className={"loginForm"}
              >
                <h3 style={{ color: "#000", fontFamily: "Roboto-Light" }}>
                  SIGNIN TO CREATE VOTING
                </h3>
                <Form.Group className="mb-3" controlId="login-control">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    className="mb-3"
                    placeholder="Username"
                    ref={l_username}
                    required
                  />

                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="mb-3"
                    placeholder="Password"
                    required
                    ref={l_password}
                  />

                  <Button
                    type="submit"
                    variant="success"
                    style={{ width: "100%", marginBottom: 10 }}
                  >
                    Login
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ width: "100%" }}
                    onClick={() => setRegister(true)}
                  >
                    Create New Account
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Col>
          <Col md={12} lg={7} className={"textgroup"}>
            <div>
              <h1>VOTING SYSTEM</h1>
              <h4 style={{ fontFamily: "Roboto-Regular" }}>
                Universtiy of Computer Studies, Dawei
              </h4>
              <h5 className="text_thura">Developed By Thura Lin Htut</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
