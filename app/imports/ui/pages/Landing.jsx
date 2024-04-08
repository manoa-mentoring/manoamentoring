import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const Landing = () => (
  <Container id="landing-page" className="py-3">
    <Row className="justify-content-start align-items-center py-4 mb-4 extra-space">
      <Col xs={10} md={4} className="mb-4">
        <h1 style={{ color: 'var(--matr-navbar-text-color)' }}>Welcome to Manoa Mentoring!</h1>
        <p className="text-lg-left" style={{ color: 'var(--matr-navbar-text-color)' }}>Our application, Manoa Mentoring, aims to bring together students
          and mentors. Students can match themselves with other students
          who are facing similar issues, or they can choose a mentor
          who specializes in a subject or course they are taking.
          Through Manoa Mentoring, our goal is to create a space
          where students can not only receive the support they need,
          but also foster connections through mentorship and potential
          friendships.
        </p>
      </Col>
    </Row>
  </Container>
);
export default Landing;
