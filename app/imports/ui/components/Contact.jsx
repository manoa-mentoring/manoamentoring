import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Contact = ({ contact }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} width={75} />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <CardBody>
      <Card.Text>{contact.description}</Card.Text>
      <Link to={`/edit/${contact._id}`}>Edit</Link>
    </CardBody>
  </Card>
);

// Require a document to be passed to this component.
Contact.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Contact;
