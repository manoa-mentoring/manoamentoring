import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import { StudySessions } from '../../api/studysession/StudySession';
import { Profiles } from '../../api/profile/Profiles';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Notes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(StudySessions.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return StudySessions.collection.find();
  }
  return this.ready();
});

// Displays the current logged-in user's profile when selecting "My Profile"
Meteor.publish('currentUserProfile', function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('mySessions', function () {
  if (this.userId) {
    const currentUser = Meteor.users.findOne(this.userId);
    return StudySessions.collection.find({ joinedUsers: currentUser._id });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});
Meteor.publish(Notes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Notes.collection.find();
  }
  return this.ready();
});

Meteor.publish(StudySessions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return StudySessions.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
