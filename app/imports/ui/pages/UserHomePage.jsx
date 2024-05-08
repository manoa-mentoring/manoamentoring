import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap
import ListStudySessions from './ListStudySessions'; // Import ListStudySessions component

const UserHomePage = () => (
  <Container id="userhome-page" className="py-3">
    <Row className="justify-content-center align-items-center py-4 mb-4 extra-space">
      <Col md={8} className="mb-4 text-center mt-4"> {/* Add some top margin */}
        <h1 style={{ color: 'var(--matr-navbar-text-color)', textShadow: '2px 1px 2px black' }}>Welcome back to Manoa Mentoring!</h1>
        <h2 style={{ color: 'var(--matr-navbar-text-color)', textShadow: '2px 1px 2px black' }}>Join a session below to get started, or view your profile:</h2>
        <Link to="/my-profile">
          {/* Add the 'btn-lg' class to make the button larger */}
          <Button variant="danger" type="button" className="btn-primary btn-lg" style={{ backgroundColor: '#024731', borderColor: '#024731' }}>Go to My Profile</Button>
        </Link>
      </Col>
    </Row>
    {/* Add ListStudySessions component to display study sessions */}
    <ListStudySessions />
    {/* Your existing code */}
  </Container>
);

export default UserHomePage;
