import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, TextField, SubmitField, HiddenField, SelectField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profiles';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the EditContact page for editing a single document. */
const EditProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditContact', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe('currentUserProfile');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditContact', doc, ready);
  // On successful submit, update the data.
  const submit = (data) => {
    const { firstName, lastName, gradYear, major, address, image, description, position, prefer } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName, gradYear, major, address, image, description, position, prefer } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Body>
              <Row>
                <Col><h2 className="text-center">Edit Profile</h2></Col>
              </Row>
              <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
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
                <Row>
                  <Col><SelectField name="prefer" placeholder="Availability?" /></Col>
                </Row>
                <ErrorsField />
                <SubmitField value="Submit" />
                <HiddenField name="owner" />
              </AutoForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
