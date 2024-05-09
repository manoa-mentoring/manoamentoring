import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { StudySessions } from '../../api/studysession/StudySession';
import { LevelSystem } from '../../api/LevelSystem/LevelSystem';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  subject: String,
  location: String,
  hostName: String,
  dateStart: Date,
  dateEnd: Date,
  image: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStudySession page for adding a document. */
const AddStudySession = () => {
  const handleRewardExp = () => {
    const user = Meteor.user();
    if (user) {
      console.log(user);
      LevelSystem(user.username, 100);
    } else {
      console.log('User not logged');
    }
  };
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, subject, location, hostName, dateStart, dateEnd, image, description } = data;
    const owner = Meteor.user().username;
    StudySessions.collection.insert(
      { name, subject, location, hostName, dateStart, dateEnd, image, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          handleRewardExp();
          swal('Success', 'Item added successfully (+100 xp)', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="add-study-session-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Body>
              <Row className="text-center"><h2>Create Study Session</h2></Row>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                <Row className="mb-3">
                  <Col><TextField id="session-name" name="name" label="Session name" /></Col>
                  <Col><TextField id="host-name" name="hostName" /></Col>
                  <Col><TextField id="subject" name="subject" /></Col>
                </Row>
                <Row className="mb-3">
                  <Col><DateField id="date-start" name="dateStart" /></Col>
                  <Col><DateField id="date-end" name="dateEnd" /></Col>
                </Row>
                <Row className="mb-3">
                  <Col><TextField id="location" name="location" /></Col>
                  <Col><TextField id="image" name="image" /></Col>
                </Row>
                <Row>
                  <Col><LongTextField id="description" name="description" /></Col>
                </Row>
                <ErrorsField />
                <SubmitField value="Create Session" id="submit" />
              </AutoForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStudySession;
