import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const Landing = () => (
  <Container id="landing-page" className="py-3">
    <Row className="justify-content-start align-items-center py-4 mb-4 extra-space">
      <Col xs={12} md={6} className="mb-4">
        <h1>Welcome to our platform!</h1>
        <p className="text-left">Here, you’ll find a vibrant community of learners dedicated to academic excellence.
          Our landing page showcases images of enthusiastic individuals engaged in studying,
          setting the tone for an interactive and collaborative learning experience. Get ready to explore our application, designed to enhance your educational journey.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Landing;
