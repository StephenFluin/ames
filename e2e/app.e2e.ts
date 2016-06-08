import { AmesPage } from './app.po';

describe('ames App', function() {
  let page: AmesPage;

  beforeEach(() => {
    page = new AmesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ames works!');
  });
});
