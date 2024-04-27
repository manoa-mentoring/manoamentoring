import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import { Envelope, Trash } from 'react-bootstrap-icons'; // Importing the Trash icon
import { Link } from 'react-router-dom';

const StudySession = ({ studySession, onDelete }) => {
  const handleDelete = () => {
    onDelete(studySession._id); // Call onDelete with the session ID
  };

  return (
    <Card className="h-100" border="success">
      <Card.Header>
        <Row>
          <Col>
            <Image src={studySession.image} width={125} className="ms-3 rounded-3 shadow" />
          </Col>
          <Col>
            <br />
            <Card.Title> {studySession.name} </Card.Title>
            <Card.Subtitle className="text-muted">
              <Badge bg="success"> {studySession.subject} </Badge>
              <br />
              <p className="mt-1"> Time: {studySession.dateStart.toLocaleString()} - {studySession.dateEnd.toLocaleString()}</p>
            </Card.Subtitle>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item> {studySession.description} </ListGroup.Item>
          <ListGroup.Item>
            <Envelope /> {studySession.owner}
          </ListGroup.Item>
        </ListGroup>
        <Link to={`/edit-study-session/${studySession._id}`}>
          <Button variant="success" className="me-2">
            Edit Session
          </Button>
        </Link>
        {/* Call handleDelete when the delete button is clicked */}
        <Button variant="danger" onClick={handleDelete}>
          <Trash className="mb-1" /> Delete Session
        </Button>
      </Card.Body>
    </Card>
  );
};

StudySession.propTypes = {
  studySession: PropTypes.shape({
    name: PropTypes.string,
    subject: PropTypes.string,
    location: PropTypes.string,
    hostName: PropTypes.string,
    dateStart: PropTypes.instanceOf(Date),
    dateEnd: PropTypes.instanceOf(Date),
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Function to handle deletion
};

export default StudySession;
