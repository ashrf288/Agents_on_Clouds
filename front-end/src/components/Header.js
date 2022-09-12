import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../context/user";

export default function Header() {
  const authContext = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        {  authContext.user&&authContext.user['token'] && (
          <Nav >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
            <Nav.Link href="/" onClick={() => authContext.logout()}>
              logout
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
