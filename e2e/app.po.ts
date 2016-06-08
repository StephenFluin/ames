export class AmesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ames-app h1')).getText();
  }
}
