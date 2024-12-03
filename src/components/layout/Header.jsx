import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="flemme-navbar py-3">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="/images/logo.png"
            height="40"
            className="d-inline-block align-top me-3"
            alt="La Flemme logo"
          />
          <span className="d-none d-md-inline">Analyse d'Investissement</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;