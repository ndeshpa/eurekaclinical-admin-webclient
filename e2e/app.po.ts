import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  
  getUsersPage() {
      return browser.get('/adminview');
  }
  
  getUserPage() {
      return browser.get('/editUser/me/edit/1');
  }
  
  getLogoutPage() {
      return browser.get('/logout');
  }

  getParagraphText() {
    return element(by.css('app-adminview h2')).getText();
  }
}
