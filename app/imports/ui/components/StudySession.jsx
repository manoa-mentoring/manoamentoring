import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import { Envelope, PeopleFill, Trash } from 'react-bootstrap-icons'; // Importing the Trash icon
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';

const StudySession = ({ studySession, onDelete }) => {
  const [joined, setJoined] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  const joinedUsersCount = studySession.joinedUsers ? studySession.joinedUsers.length : 0;

  // Fetch the current user on component mount
  useEffect(() => {
    setCurrentUser(Meteor.user());
  }, []);

  // Maintains state of "join/leave" button
  useEffect(() => {
    // Check if the state is already persisted in localStorage
    const persistedState = localStorage.getItem(`studySession_${studySession._id}`);
    if (persistedState !== null) {
      setJoined(persistedState === 'true');
    }
  }, [studySession._id]);

  const handleDelete = () => {
    onDelete(studySession._id); // Call onDelete with the session ID
  };

  const handleJoinSession = () => {
    if (!joined) {
      Meteor.call('studysessions.join', studySession._id);
      swal('', 'You have joined this study session.', 'success');
    } else {
      Meteor.call('studysessions.unjoin', studySession._id);
      swal('', 'You have left this study session.', 'info');
    }
    setJoined(!joined);
    // Persist the state in localStorage
    localStorage.setItem(`studySession_${studySession._id}`, !joined);
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
              {/* Displays number of users who joined the study session */}
              <PeopleFill /> {joinedUsersCount}
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
        <div className="d-flex justify-content-between mt-3">
          {/* Call handleJoinSession when the Join/Leave button is clicked */}
          <Button onClick={handleJoinSession}>
            {joined ? 'Leave' : 'Join'}
          </Button>
          {/* Render the Edit Session button only if the current user is the owner */}
          {currentUser && currentUser.username === studySession.owner && (
            <Link to={`/edit-study-session/${studySession._id}`}>
              <Button variant="success" className="me-2">
                Edit Session
              </Button>
            </Link>
          )}
          {/* Render the Delete Session button only if the current user is the owner */}
          {currentUser && currentUser.username === studySession.owner && (
            <Button variant="danger" onClick={handleDelete}>
              <Trash className="mb-1" /> Delete Session
            </Button>
          )}
        </div>
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
    joinedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Function to handle deletion
};

export default StudySession;
