import { Selector } from 'testcafe';

class CreateprofilePage {
  constructor() {
    this.pageId = '#createprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async createprofile(testController, firstName, lastName, address, image, description, gradYear, major, position, prefer) {
    await this.isDisplayed(testController);
    await testController.typeText('#createprofile-form-firstName', firstName);
    await testController.typeText('#createprofile-form-lastName', lastName);
    await testController.typeText('#createprofile-form-address', address);
    await testController.typeText('#createprofile-form-image', image);
    await testController.typeText('#createprofile-form-description', description);
    await testController.typeText('#createprofile-form-gradYear', gradYear);
    await testController.typeText('#createprofile-form-major', major);
    await testController.typeText('#createprofile-form-position', position);
    await testController.typeText('#createprofile-form-prefer', prefer);
    await testController.click('#createprofile-form-submit input.btn.btn-primary');
  }
}

export const createprofilePage = new CreateprofilePage();
