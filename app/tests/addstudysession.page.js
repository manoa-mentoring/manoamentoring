import { Selector } from 'testcafe';

class AddStudySessionPage {
  constructor() {
    this.pageId = '#add-study-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoCreateSessionPage(testController) {
    await testController.click('#create-session-nav');
  }

  async fillForm(testController) {
    const formatDate = (date) => {
      // Format date to YYYY-MM-DD for input field
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    await testController
      .typeText('#session-name', 'Test Session Name')
      .typeText('#host-name', 'Test Host Name')
      .typeText('#subject', 'Test Subject')
      .typeText('#date-start', formatDate(new Date('2024-04-23'))) // Convert Date to string
      .typeText('#date-end', formatDate(new Date('2024-04-24'))) // Convert Date
      .typeText('#location', 'Test Location')
      .typeText('#image', 'Test Image URL')
      .typeText('#description', 'Test Description');

    await testController.click('#submit');
  }
}

export const addStudySessionPage = new AddStudySessionPage();
