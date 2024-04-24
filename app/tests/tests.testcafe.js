import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { listcontactsadminPage } from './listcontactsadmin.page';
import { navBar } from './navbar.component';
import { listStudySessionsPage } from './liststudysessions.page';
import { addStudySessionPage } from './addstudysession.page';
import { editStudySessionPage } from './editstudysession.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const admincredentials = { username: 'admin@foo.com', password: 'changeme' };
fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
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
