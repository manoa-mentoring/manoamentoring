import { Selector } from 'testcafe';

class ListStudySessionsPage {
  constructor() {
    this.pageId = '#view-study-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok({ timeout: 5000 });
  }
}

export const listStudySessionsPage = new ListStudySessionsPage();
