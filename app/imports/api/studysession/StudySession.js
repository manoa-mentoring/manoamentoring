import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StudySessionCollection. It encapsulates state and variable values for contact.
 */
class StudySessionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StudySessionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      subject: String,
      location: String,
      hostName: String,
      dateStart: Date,
      dateEnd: Date,
      image: String,
      description: String,
      owner: String,
      joinedUsers: {
        type: Array,
        optional: true,
      },
      'joinedUsers.$': String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StudySessionsCollection.
 * @type {StudySessionsCollection}
 */
export const StudySessions = new StudySessionsCollection();
