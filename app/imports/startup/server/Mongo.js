import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { StudySessions } from '../../api/studysession/StudySession';

/* eslint-disable no-console */

// Initialize the database with a default data document.

const addContact = (contact) => {
  console.log(`  Adding: ${contact.lastName} (${contact.owner})`);
  Contacts.collection.insert(contact);
};

const addStudySession = (studySession) => {
  console.log(`  Adding: ${studySession.name} (${studySession.owner})`);
  StudySessions.collection.insert(studySession);
};
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.forEach(contact => addContact(contact));
  }
}
if (StudySessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudySessions) {
    console.log('Creating default study sessions.');
    Meteor.settings.defaultStudySessions.forEach(studySession => addStudySession(studySession));
  }
}
