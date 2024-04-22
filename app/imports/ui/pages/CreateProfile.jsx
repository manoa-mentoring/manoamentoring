import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profile/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  image: String,
  gradYear: String,
  major: String,
  position: {
    type: String,
    allowedValues: ['Mentor', 'Student'],
  },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const CreateProfile = ({ location }) => {
  const [redirectToReferer, setRedirectToRef] = useState(false);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, address, image, gradYear, major, position, description } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert(
      { firstName, lastName, address, image, gradYear, major, position, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile Created!', 'success');
          formRef.reset();
          setRedirectToRef(true);
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/user-home' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Body>
              <Row className="text-center"><h2>Create Profile</h2></Row>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                <Row className="mb-3">
                  <Col><TextField name="firstName" /></Col>
                  <Col><TextField name="lastName" /></Col>
                </Row>
                <Row className="mb-3">
                  <Col><TextField name="address" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><LongTextField name="description" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="gradYear" /></Col>
                  <Col><TextField name="major" /></Col>
                  <Col><SelectField name="position" placeholder="Are you a Mentor or a Student?" /></Col>
                </Row>
                <ErrorsField />
                <SubmitField value="Submit" />
              </AutoForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
CreateProfile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

CreateProfile.defaultProps = {
  location: { state: '' },
};

export default CreateProfile;
