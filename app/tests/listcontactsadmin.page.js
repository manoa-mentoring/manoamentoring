import { Selector } from 'testcafe';

class ListcontactsadminPage {
  constructor() {
    this.pageId = '#list-stuff-admin-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listcontactsadminPage = new ListcontactsadminPage();
