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
  prefer: {
    type: String,
    allowedValues: ['Online', 'In-Person', 'Online/In-Person'],
  },
  description: String,
  level: {
    type: Number,
    defaultValue: 1,
  },
  exp: {
    type: Number,
    defaultValue: 0,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const CreateProfile = ({ location }) => {
  const [redirectToReferer, setRedirectToRef] = useState(false);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, address, image, gradYear, major, position, description, prefer } = data;
    const owner = Meteor.user().username;
    const level = 1;
    const exp = 0;
    Profiles.collection.insert(
      { firstName, lastName, address, image, gradYear, major, position, description, owner, prefer, level, exp },
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
    <Container id="createprofile-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Body>
              <Row className="text-center"><h2>Create Profile</h2></Row>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                <Row className="mb-3">
                  <Col><TextField id="createprofile-form-firstName" name="firstName" /></Col>
                  <Col><TextField id="createprofile-form-lastName" name="lastName" /></Col>
                </Row>
                <Row className="mb-3">
                  <Col><TextField id="createprofile-form-address" name="address" /></Col>
                  <Col><TextField id="createprofile-form-image" name="image" /></Col>
                </Row>
                <Row>
                  <Col><LongTextField id="createprofile-form-description" name="description" /></Col>
                </Row>
                <Row>
                  <Col><TextField id="createprofile-form-gradYear" name="gradYear" /></Col>
                  <Col><TextField id="createprofile-form-major" name="major" /></Col>
                  <Col><SelectField id="createprofile-form-position" name="position" placeholder="Are you a Mentor or a Student?" /></Col>
                </Row>
                <Row>
                  <Col><SelectField id="createprofile-form-prefer" name="prefer" placeholder="Availability?" /></Col>
                </Row>
                <ErrorsField />
                <SubmitField id="createprofile-form-submit" value="Submit" />
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
