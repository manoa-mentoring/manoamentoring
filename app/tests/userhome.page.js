import { Selector } from 'testcafe';

class UserhomePage {
  constructor() {
    this.pageId = '#userhome-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok({ timeout: 10000 });
  }
}

export const userhomePage = new UserhomePage();
