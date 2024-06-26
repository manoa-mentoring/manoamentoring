import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Button, Card, Col, Container, InputGroup, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { EyeFill } from 'react-bootstrap-icons';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/user-home" />);
  }
  // Otherwise return the Login form.met
  return (
    <div className="py-5">
      <Container id="signin-page" className="align-items-center py-5">
        <Row className="justify-content-center">
          <Col xs={6}>
            <Col className="text-center">
              <h2 style={{ color: 'white', backgroundColor: '#a5a8b4' }}>Login to your account</h2>
            </Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <Card>
                <Card.Body>
                  <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                  <InputGroup>
                    <TextField id="signin-form-password" name="password" placeholder="Password" type={showPassword ? 'text' : 'password'} style={{ width: '561px' }} />
                    <Button type="button" onClick={() => setShowPassword(!showPassword)} class="btn btn-light" className="button-height"><EyeFill /></Button>
                  </InputGroup>
                  <ErrorsField />
                  <SubmitField id="signin-form-submit" value="Login" />
                </Card.Body>
              </Card>
            </AutoForm>
            <Alert variant="light">
              <Link to="/signup">Click here to Register</Link>
            </Alert>
            {error === '' ? (
              ''
            ) : (
              <Alert variant="danger">
                <Alert.Heading>Login was not successful</Alert.Heading>
                {error}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
