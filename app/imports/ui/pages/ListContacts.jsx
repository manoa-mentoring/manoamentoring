import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact'; // Assuming Contact component is defined
import { Contacts } from '../../api/contact/Contacts'; // Assuming contacts is exported from Notes
import { Notes } from '../../api/note/Notes';
// Assuming notes is exported from Notes

const ListContacts = () => {
  const { ready, contacts, notes } = useTracker(() => {
    // eslint-disable-next-line no-undef
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    const rdy = subscription.ready() && subscription2.ready();
    const contactItems = Contacts.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();
    return {
      contacts: contactItems,
      notes: noteItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact) => (
              <Col key={contact._id}>
                <Contact
                  contact={contact}
                  notes={notes.filter(note => note.contactId === contact._id)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;
