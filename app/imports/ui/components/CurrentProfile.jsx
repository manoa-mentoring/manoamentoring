import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Profile = ({ contact }) => (
  <Card className="h-100" border="success">
    <Card.Header>
      <Row>
        <Col>
          <Image src={contact.image} width={125} className="ms-3 rounded-3 shadow" />
        </Col>
        <Col>
          <br />
          <Card.Title> {contact.firstName} {contact.lastName} </Card.Title>
          <Card.Subtitle className="text-muted">
            <Badge bg="success"> {contact.major} </Badge>
            <br />
            <p className="mt-1">{contact.gradYear}</p>
          </Card.Subtitle>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item> {contact.description} </ListGroup.Item>
        <ListGroup.Item>
          <strong>Prefers</strong>
          <br />
          Online & In-Person
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Courses I&apos;m Taking</strong>
          <br />
          <Badge bg="success">ICS 314</Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <Envelope /> {contact.owner}
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
    <Card.Footer>
      <Link to={`/edit/${contact._id}`}>
        <Button variant="success">
          Edit Profile
        </Button>
      </Link>
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
Profile.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    gradYear: PropTypes.string,
    major: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Profile;
