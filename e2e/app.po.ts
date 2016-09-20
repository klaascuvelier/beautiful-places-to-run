export class BeautifulPlacesToRunPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('beautiful-places-to-run-app h1')).getText();
  }
}
