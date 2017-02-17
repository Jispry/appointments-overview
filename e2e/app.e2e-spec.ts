import { AppointmentsOverviewPage } from './app.po';

describe('appointments-overview App', function() {
  let page: AppointmentsOverviewPage;

  beforeEach(() => {
    page = new AppointmentsOverviewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
