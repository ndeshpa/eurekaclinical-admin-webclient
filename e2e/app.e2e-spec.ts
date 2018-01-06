import { AppPage } from './app.po';

describe('eurekaclinical-admin-webclient App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    page.getUsersPage();
    page.getUserPage();
    page.getLogoutPage();
    //expect(page.getParagraphText()).toEqual('User Accounts');
  });
});
