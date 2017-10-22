import { NinetySixKPage } from './app.po';

describe('ninety-six-k App', function() {
  let page: NinetySixKPage;

  beforeEach(() => {
    page = new NinetySixKPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
