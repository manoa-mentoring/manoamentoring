import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/named
import { LoadingSpinner } from '../components/LoadingSpinner';
import Contact from '../components/Contact'; // Assuming Contact component is defined

/* Define some sample contact data */
const contacts = [
  {
    firstName: 'Philip',
    lastName: 'Johnson',
    address: 'POST 307, University of Hawaii',
    image: 'https://github.com/philipmjohnson.png',
    description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
      'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
  {
    firstName: 'Henri',
    lastName: 'Casanova',
    address: 'POST 307, University of Hawaii',
    image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
    description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof ' +
      'that I ran the Hana relay with an actual Team.',
  },
  {
    firstName: 'Kim',
    lastName: 'Binsted',
    address: 'POST 307, University of Hawaii',
    image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
    description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence ' +
      'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of ' +
      'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as ' +
      '"What do you call a Martian who drinks beer? An ale-ien!".',
  },
];

const ListContacts = () => {
  // Set ready to true since we're not subscribing to any data
  const ready = true;

  return ready ? (
    <Container className="py-3">
      <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
        {/* Render the list of contacts in a grid */}
        {contacts.map((contact, index) => (
          <Col key={index}>
            <Contact contact={contact} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListContacts;
