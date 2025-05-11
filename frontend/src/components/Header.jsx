import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaAddressCard } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

const Header = () => {
  const { authToken, logout } = useAuth();
  const axios = useAxios();

  const handleLogout = async () => {
    logout();
    try {
      await axios.post("/logout");
      window.location.reload();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    }
  };

  return (
    <header>
      <Navbar  bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Members Only</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {authToken ? (
                <>
                  <LinkContainer to="/post" className="me-2">
                    <Nav.Link>
                      <FaMessage className="me-1" /> New Post
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile" className="me-2">
                    <Nav.Link>
                      <FaAddressCard className="me-1" /> Profile
                    </Nav.Link>
                  </LinkContainer>

                  <Nav.Link onClick={handleLogout} className="me-2">
                    <FaSignOutAlt className="me-1" /> Sign Out
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/login" className="me-2">
                    <Nav.Link>
                      <FaSignInAlt className="me-1" /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register" className="me-2">
                    <Nav.Link>
                      <FaSignOutAlt className="me-1" /> Sign Up
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
