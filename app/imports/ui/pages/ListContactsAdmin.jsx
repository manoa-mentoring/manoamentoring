import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Contacts } from '../../api/contact/Contacts';
import ContactAdmin from '../components/ContactAdmin'; // Assuming contacts is exported from Notes

const ListContactsAdmin = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const { ready, contacts } = useTracker(() => {
    // eslint-disable-next-line no-undef
    const subscription = Meteor.subscribe(Contacts.adminPublicationName);
    const rdy = subscription.ready();
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (ready ? (
    <Container className="py-2">
      <Row className="justify-content-center bg-white">
        <Col>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 'CurrentStudyGroup' ? 'active' : ''}`} aria-current="page" href="#" onClick={() => handleTabClick('CurrentStudyGroup')}>Current Study Groups</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 'UserModeration' ? 'active' : ''}`} aria-current="page" href="#" onClick={() => handleTabClick('UserModeration')}>User Moderation
              </a>
            </li>
          </ul>

          {activeTab === 'UserModeration' && (
            <div data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="0" className="scrollspy mt-4">
              <Row xs={1} md={2} lg={3} className="g-4">
                {contacts.map((contact) => (
                  <Col key={contact._id}><ContactAdmin contact={contact} /></Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContactsAdmin;
