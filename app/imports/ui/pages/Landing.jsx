import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const Landing = () => (
  <Container id="landing-page" className="py-3">
    <Row className="justify-content-center align-items-center py-5 mb-4 extra-space">
      <Col xs={9} md={4} className="mb-4 text-center" style={{ marginRight: '50px' }}>
        <p style={{
          color: 'var(--matr-navbar-text-color)',
          textShadow: '0 0 10px black', /* Add black outline */
        }}
        >
          Our application, Manoa Mentoring, aims to bring together students
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
