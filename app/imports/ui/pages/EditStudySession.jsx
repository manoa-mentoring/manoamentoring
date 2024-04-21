import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, TextField, SubmitField, HiddenField, DateField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { StudySessions } from '../../api/studysession/StudySession';

const bridge = new SimpleSchema2Bridge(StudySessions.schema);

/* Renders the EditContact page for editing a single document. */
const EditStudySession = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditContact', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(StudySessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = StudySessions.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditContact', doc, ready);
  // On successful submit, update the data.
  const submit = (data) => {
    const { name, subject, location, hostName, dateStart, dateEnd, image, description } = data;
    StudySessions.collection.update(_id, { $set: { name, subject, location, hostName, dateStart, dateEnd, image, description } }, (error) => {
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
                <Col><h2 className="text-center">Edit Study Session</h2></Col>
              </Row>
              <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
                <Row>
                  <Col><TextField name="name" label="Session name" /></Col>
                  <Col><TextField name="hostName" /></Col>
                  <Col><TextField name="subject" /></Col>
                </Row>
                <Row>
                  <Col><DateField name="dateStart" /></Col>
                  <Col><DateField name="dateEnd" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="location" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><LongTextField name="description" /></Col>
                </Row>
                <ErrorsField />
                <HiddenField name="owner" />
                <SubmitField />
              </AutoForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditStudySession;
