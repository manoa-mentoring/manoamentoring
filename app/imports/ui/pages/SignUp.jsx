import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'; // Importing the eye icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: {
      type: String,
      optional: true, // Make password field optional
    },
    firstName: String,
    lastName: String,
    role: {
      type: String,
      allowedValues: ['mentor', 'student', 'Mentor', 'Student'],
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password, firstName, lastName } = doc;
    Accounts.createUser({ email, username: email, password, profile: { firstName, lastName }, role: doc.role }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-5 ">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2 style={{ color: 'white', backgroundColor: '#a5a8b4' }}>To sign up, please complete the form below: </h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" />
                    <InputGroup.Text style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeSlashFill /> : <EyeFill />} {/* Eye icon */}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <TextField name="firstName" placeholder="First name" />
                <TextField name="lastName" placeholder="Last name" />
                <TextField name="role" placeholder="Are you a Mentor or a Student?" />
                <SubmitField value="Sign Up" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light" style={{ color: 'white' }}>
            Already have an account? Sign in <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
