import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Profile = ({ profile }) => (
  <Card className="h-100" border="success">
    <Card.Header>
      <Row>
        <Col>
          <Image src={profile.image} width={125} className="ms-3 rounded-3 shadow" />
        </Col>
        <Col>
          <br />
          <Card.Title> {profile.firstName} {profile.lastName} </Card.Title>
          <Card.Subtitle className="text-muted">
            <Badge bg="success"> {profile.major} </Badge>
            <br />
            <p className="mt-1">{profile.gradYear}</p>
          </Card.Subtitle>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item> {profile.description} </ListGroup.Item>
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
          <Envelope /> {profile.owner}
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
    <Card.Footer>
      <Link to={`/edit/${profile._id}`}>
        <Button variant="success">
          Edit Profile
        </Button>
      </Link>
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.shape({
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
