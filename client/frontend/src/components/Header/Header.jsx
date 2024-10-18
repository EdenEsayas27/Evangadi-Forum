import { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
import logo from '../../assets/images/evangadi-logo-black.png';
import './header.css';

const Header = () => {
  const { user, setUser } = useContext(AppState); // Make sure you have setUser available
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    setIsLoggedIn(user); // Set true or false based on user existence
  }, [user]);

  const handleLogout = () => {
    if (isLoggedIn) {
      // Remove the token from localStorage
      localStorage.removeItem('authToken'); // Replace 'authToken' with the key used to store the token

      // Optionally, clear all localStorage
      localStorage.clear();

      setUser(null); // Clear user context or state
      navigate('/'); // Navigate to home page after logout
    } else {
      // If the user is not logged in, navigate to the register page
      navigate('/');
    }
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      sticky="top"
      className="shadow-sm border-bottom py-4"
    >
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} alt="logo" style={{ width: '170px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              How it Works
            </Nav.Link>
            <button
              className="btn btn-primary px-5 fs-4"
              onClick={handleLogout}
            >
              {isLoggedIn ? 'Logout' : 'Sign In'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
