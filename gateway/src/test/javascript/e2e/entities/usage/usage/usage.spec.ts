import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import UsageComponentsPage, { UsageDeleteDialog } from './usage.page-object';
import UsageUpdatePage from './usage-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Usage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let usageComponentsPage: UsageComponentsPage;
  let usageUpdatePage: UsageUpdatePage;
  let usageDeleteDialog: UsageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Usages', async () => {
    await navBarPage.getEntityPage('usage');
    usageComponentsPage = new UsageComponentsPage();
    expect(await usageComponentsPage.getTitle().getText()).to.match(/Usages/);
  });

  it('should load create Usage page', async () => {
    await usageComponentsPage.clickOnCreateButton();
    usageUpdatePage = new UsageUpdatePage();
    expect(await usageUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.usageUsage.home.createOrEditLabel/);
    await usageUpdatePage.cancel();
  });

  it('should create and save Usages', async () => {
    async function createUsage() {
      await usageComponentsPage.clickOnCreateButton();
      await usageUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await usageUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await usageUpdatePage.setDetailsInput('details');
      expect(await usageUpdatePage.getDetailsInput()).to.match(/details/);
      await usageUpdatePage.setSentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await usageUpdatePage.getSentDateInput()).to.contain('2001-01-01T02:30');
      await usageUpdatePage.setUserIdInput('5');
      expect(await usageUpdatePage.getUserIdInput()).to.eq('5');
      await usageUpdatePage.setProductIdInput('5');
      expect(await usageUpdatePage.getProductIdInput()).to.eq('5');
      await waitUntilDisplayed(usageUpdatePage.getSaveButton());
      await usageUpdatePage.save();
      await waitUntilHidden(usageUpdatePage.getSaveButton());
      expect(await usageUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createUsage();
    await usageComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await usageComponentsPage.countDeleteButtons();
    await createUsage();
    await usageComponentsPage.waitUntilLoaded();

    await usageComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await usageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Usage', async () => {
    await usageComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await usageComponentsPage.countDeleteButtons();
    await usageComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    usageDeleteDialog = new UsageDeleteDialog();
    expect(await usageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.usageUsage.delete.question/);
    await usageDeleteDialog.clickOnConfirmButton();

    await usageComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await usageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
