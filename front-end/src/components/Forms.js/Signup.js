import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import React from "react";
import axios from "axios";
export default function Login() {
  
  const navigate = useNavigate();

  const register = async(e) => {
    e.preventDefault();
    let user = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,

    };
    axios.post(process.env.REACT_APP_API_URL + "/signup", user).then(resp=>{
      navigate('/');
    }).catch(err=>{
      console.log(err);
    }
    )
    
  
  }
  return (
    <Form style={formStyle} onSubmit={(e) => register(e)}>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>username</Form.Label>
        <Form.Control type="text" placeholder="username" name='username' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' />
      </Form.Group>
      <Row>
        <Col sm={12} md={6} style={{ marginBlock: "2%" }}>
          <Button variant="primary" type="submit">
            SIGN UP
          </Button>
        </Col>
        <Col m={12} md={6} style={{ marginBlock: "2%" }}>
          <Button variant="primary" type="submit" onClick={() => navigate("/")}>
            back to LOGIN
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
const formStyle = {
  width: "45%",
  margin: "auto",
  marginTop: "10%",
  backgroundColor: "#212529",
  padding: "10px",
  borderRadius: "10px",
  color: "white",
};
