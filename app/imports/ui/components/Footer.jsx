import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-1 bg-dark"> {/* Reduced padding */}
    <Container>
      <Col className="text-center">
        Created and Maintained by: Roger Tulonghari, Grace Madson, Hazelle Limos, Robert Maddox, and Hau’oli O’Brien
        {' '}
        <br />
        <a href="https://manoa-mentoring.github.io/">
          More about our Project here (click me!)
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
