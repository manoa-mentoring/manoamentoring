import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { StudySessions } from '../../api/studysession/StudySession';
import StudySession from '../components/StudySession';
import { Profiles } from '../../api/profile/Profiles';

const ListStudySessions = () => {
  const { ready1, ready2, sessions, profiles } = useTracker(() => {
    // eslint-disable-next-line no-undef
    const sessionSubscription = Meteor.subscribe(StudySessions.userPublicationName);
    const profileSubscription = Meteor.subscribe('currentUserProfile');
    const sessionRdy = sessionSubscription.ready();
    const profileRdy = profileSubscription.ready();
    const sessionItems = StudySessions.collection.find({}).fetch();
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      sessions: sessionItems,
      profiles: profileItems,
      ready1: sessionRdy,
      ready2: profileRdy,
    };
  }, []);

  return (ready1 && ready2 ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2 className="page-title">Available Study Sessions</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {sessions.map((session) => (
              profiles.map((profile) => (
                <Col key={`${session._id}-${profile._id}`}>
                  <StudySession
                    studySession={session}
                    profile={profile}
                  />
                </Col>
              ))
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStudySessions;
