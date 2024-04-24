import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Contacts } from '../../api/contact/Contacts';
import { StudySessions } from '../../api/studysession/StudySession';
import ContactAdmin from '../components/ContactAdmin'; // Assuming contacts is exported from Notes
import StudySession from '../components/StudySession';

const ListContactsAdmin = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const { ready, contacts, studysessions } = useTracker(() => {
    // eslint-disable-next-line no-undef
    const subscription1 = Meteor.subscribe(Contacts.adminPublicationName);
    // eslint-disable-next-line no-undef
    const subscription2 = Meteor.subscribe(StudySessions.adminPublicationName);
    const rdy1 = subscription1.ready();
    const rdy2 = subscription2.ready();
    const contactItems = Contacts.collection.find({}).fetch();
    const studysessionItems = StudySessions.collection.find({}).fetch();
    return {
      contacts: contactItems,
      studysessions: studysessionItems,
      ready: rdy1, rdy2,
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
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={`nav-link ${activeTab === 'CurrentStudyGroup' ? 'active' : ''}`} aria-current="page" href="#" onClick={() => handleTabClick('CurrentStudyGroup')}>Current Study Groups</a>
            </li>
            <li className="nav-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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

          {activeTab === 'CurrentStudyGroup' && (
            <div data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="0" className="scrollspy mt-4">
              <Row xs={1} md={2} lg={3} className="g-4">
                {studysessions.map((studysession) => (
                  <Col key={studysession._id}><StudySession studySession={studysession} /></Col>
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
