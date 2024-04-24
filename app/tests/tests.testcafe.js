import { landingPage } from './landing.page';
import { userhomePage } from './userhome.page';
import { calendarPage } from './calendar.page';
import { signinPage } from './signin.page';
import { signupPage } from './signup.page';
import { signoutPage } from './signout.page';
import { listcontactsadminPage } from './listcontactsadmin.page';
import { createprofilePage } from './createprofile.page';
import { navBar } from './navbar.component';
import { listStudySessionsPage } from './liststudysessions.page';
import { addStudySessionPage } from './addstudysession.page';
import { editStudySessionPage } from './editstudysession.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const admincredentials = { username: 'admin@foo.com', password: 'changeme' };
const credentials2 = { username: 'bob@foo.com', password: 'changeme' };
const credentials3 = { firstName: 'Bob', lastName: 'Brown', address: 'POST 307, University of Hawaii',
  gradYear: '2026', major: 'Computer Science', image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', description: 'Hello guys!', position: 'Student', prefer: 'In-Person' };
const credentials4 = { username: 'alex@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signup and signout work', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that create profile works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, credentials4.username, credentials4.password);
  await navBar.isLoggedIn(testController, credentials4.username);
  // eslint-disable-next-line max-len
  await createprofilePage.createprofile(testController, credentials3.firstName, credentials3.lastName, credentials3.address, credentials3.image, credentials3.description, credentials3.gradYear, credentials3.major, credentials3.position, credentials3.prefer);
});
test('Test that user home page shows up and is functional', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await userhomePage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that calendar page is present', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCalendarPage(testController);
  await calendarPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that View Study Sessions shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListStudySessionsPage(testController);
  await listStudySessionsPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that the list contact admin pages displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admincredentials.username, admincredentials.password);
  await navBar.gotoListContactsAdmin(testController);
  await listcontactsadminPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that the Create Session page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoCreateSessionPage(testController);
  await addStudySessionPage.isDisplayed(testController);
  await addStudySessionPage.fillForm(testController);
});

test('Test that the Edit Session page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoEditSessionPage(testController);
  await editStudySessionPage.isDisplayed(testController);
  await editStudySessionPage.fillForm(testController);
});
