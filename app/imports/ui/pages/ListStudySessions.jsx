import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { StudySessions } from '../../api/studysession/StudySession';
import StudySession from '../components/StudySession';

const ListStudySessions = () => {
  const { ready, sessions } = useTracker(() => {
    // eslint-disable-next-line no-undef
    const subscription = Meteor.subscribe(StudySessions.userPublicationName);
    const rdy = subscription.ready();
    const sessionItems = StudySessions.collection.find({}).fetch();
    return {
      sessions: sessionItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2 className="page-title">Available Study Sessions</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {sessions.map((session) => (
              <Col key={session._id}>
                <StudySession
                  studySession={StudySession}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStudySessions;
