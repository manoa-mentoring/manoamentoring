import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ContactsCollection. It encapsulates state and variable values for contact.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      address: String,
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
      image: String,
      description: String,
      level: Number,
      exp: Number,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
