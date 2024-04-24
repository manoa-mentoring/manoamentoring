import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserHomePage = () => (
  <Container id="userhome-page" className="py-3">
    <Row className="justify-content-center align-items-center py-4 mb-4 extra-space">
      <Col xs={10} md={4} className="mb-4 text-center">
        <h1 style={{ color: 'var(--matr-navbar-text-color)' }}>Welcome back user!</h1>
        <Link to="/my-profile">
          <button type="button" className="btn-primary" style={{ backgroundColor: '#024731', borderColor: '#024731' }}>Go to Profile</button>
        </Link>
      </Col>
    </Row>
    {/* Add a new Row and Col for recommended pictures */}
    <Row className="justify-content-center">
      <Col xs={12}>
        <h2 style={{ color: 'var(--matr-navbar-text-color)' }}>Recommended Study Sessions For You:</h2>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs={6} md={3} className="mb-4">
        {/* Placeholder for recommended picture 1 */}

      </Col>
      <Col xs={6} md={3} className="mb-4">
        {/* Placeholder for recommended picture 2 */}
        <img src="/images/study-sesh-2.png" alt="" style={{ maxWidth: '100%' }} />
      </Col>
      <Col xs={6} md={3} className="mb-4">
        {/* Placeholder for recommended picture 3 */}
        <img src="/images/study-sesh-3.png" alt="" style={{ maxWidth: '100%' }} />
      </Col>
      {/* Add more Col components for additional recommended pictures */}
    </Row>
    <Row className="justify-content-center">
      <Col xs={12}>
        <h2 style={{ color: 'var(--matr-navbar-text-color)' }}>Your Stats:</h2>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs={12}>
        <p className="text-lg-left" style={{ color: 'var(--matr-navbar-text-color)' }}> Weekly sessions: 2</p>
      </Col>
      <Col xs={12}>
        <p className="text-lg-left" style={{ color: 'var(--matr-navbar-text-color)' }}> Total sessions joined: 12</p>
      </Col>
      <Col xs={12}>
        <p className="text-lg-left" style={{ color: 'var(--matr-navbar-text-color)' }}> Total sessions hosted: 5</p>
      </Col>
    </Row>
  </Container>
);
export default UserHomePage;
