import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaAddressCard } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout, loggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Members Only</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {loggedIn() ? (
                <>
                  <LinkContainer to="/post">
                    <Nav.Link>
                      <FaMessage /> New Post
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <FaAddressCard /> Profile
                    </Nav.Link>
                  </LinkContainer>
                  
                    <Nav.Link onClick={handleLogout}>
                      <FaSignOutAlt /> Sign Out
                    </Nav.Link>
                  
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
