import { BeautifulPlacesToRunPage } from './app.po';

describe('beautiful-places-to-run App', function() {
  let page: BeautifulPlacesToRunPage;

  beforeEach(() => {
    page = new BeautifulPlacesToRunPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
