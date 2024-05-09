import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profiles';
import AddStudySession from './AddStudySession';

const DisplayAddSession = () => {
  const { ready, profiles } = useTracker(() => {
    // eslint-disable-next-line no-undef
    const subscription = Meteor.subscribe('currentUserProfile');
    const rdy = subscription.ready();
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2 className="page-title">Add Study Session</h2>
          </Col>
          <Row className="g-4 justify-content-center">
            {profiles.map((profile) => (
              <Col key={profile._id}>
                <AddStudySession
                  profile={profile}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default DisplayAddSession;
