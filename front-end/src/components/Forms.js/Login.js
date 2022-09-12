import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import {AuthContext} from "../../context/user";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
export default function Login() {
  const navigate = useNavigate();

  const authContext=useContext(AuthContext);
  let signIN = async(e) => {
    e.preventDefault();
    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const response = await axios.post(process.env.REACT_APP_API_URL + "/login", user)
    authContext.changeUser(response.data);


    

  };

  

  return (
    <Form onSubmit={(e) => signIN(e)} style={formStyle}>
      <h1 style={{textAlign:'center'}}>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' />
      </Form.Group>
      <Row >
        <Col sm={12}md={6}  style={{marginBlock:'2%'}}>
        <Button variant="primary" type="submit" >
        LOGIN
      </Button>
        </Col>
        <Col m={12} md={6} style={{marginBlock:'2%'}}>
        <Button variant="primary" type="submit" onClick={()=>navigate('/register')} >
        REGISTER 
      </Button>
        </Col>


      </Row>

    </Form>
  );
}

const formStyle={
  width:'45%',
  margin:'auto',
  marginTop:'10%',
  backgroundColor:'#212529',
  padding:'10px',
  borderRadius:'10px',
  color:'white'

}