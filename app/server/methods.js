import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { StudySessions } from '../imports/api/studysession/StudySession';

Meteor.methods({
  'studysessions.join'(sessionId) {
    // Checks if sessionId is a String
    check(sessionId, String);
    const currentUser = Meteor.users.findOne(this.userId);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to join a session.');
    }

    // Add the current user to the joinedUsers array of the session document
    StudySessions.collection.update({ _id: sessionId }, { $addToSet: { joinedUsers: currentUser._id } });
  },
  'studysessions.unjoin'(sessionId) {
    check(sessionId, String);
    const currentUser = Meteor.users.findOne(this.userId);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to leave a session.');
    }

    // Removes the current user from the joinedUsers array of the session document
    StudySessions.collection.update({ _id: sessionId }, { $pull: { joinedUsers: currentUser._id } });
  },
});
