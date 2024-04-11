import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact'; // Assuming Contact component is defined
import { Contacts } from '../../api/contact/Contacts';
import Profile from '../components/CurrentProfile'; // Assuming contacts is exported from Notes

const ListCurrentProfile = () => {
  const { ready, contacts } = useTracker(() => {
    // eslint-disable-next-line no-undef
    const subscription = Meteor.subscribe('currentUserProfile');
    const rdy = subscription.ready();
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2 className="page-title">My Profile</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
            {contacts.map((contact) => (
              <Col key={contact._id}>
                <Profile
                  contact={contact}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCurrentProfile;
