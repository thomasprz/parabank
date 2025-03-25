import { test, expect } from '../fixtures/base.fixture';
import {registerDataFaker} from '../utils/register.utils'

test.describe('Transfert Bancaire', () => {
  test.beforeEach('Préparation de l\'environnement', async ({admin,register,sidebar}) => {
      //Arrange
      const userData = registerDataFaker();
      const db = {
        initialBalance : '1000',
        minimumBalance : '0',
      }
      //Act
     await admin.goTo('parabank/admin.htm');
     await admin.setApplicationSettings(db);
     await admin.clickSubmitButton();
      // Création utilisateur
     await sidebar.clickRegister();
     await register.fillRegistrationForm(userData);
     await register.clickRegister();
    })
  test('Transfert de Fonds entre deux Comptes', async ({ account,sidebar}) => {
      // Arrange    
      const mainAccount = {
        initialBalance : '1000.OO',
        finalBalance : '800.00',
        availableAmount : '800.00',
      }
      const secondAccount = {
        type: "CHECKING",
        finalBalance : '200.00',
        availableAmount :'200.00',
      }
      const amountTransfer = '200.00'


      // Act
      await sidebar.clickAccountsOverview()
      const mainAccountId = await account.overview.getAccountNumber()
      await sidebar.clickOpenNewAccount();
      await account.open.selectAccountType(secondAccount.type);
      await account.open.clickOpenNewAccount();    
      const accountCreatedId = await account.open.getAccountCreatedId();
      await account.open.clickAccountCreated(accountCreatedId);
      await account.details.expectAccountDetailsInformation(accountCreatedId, secondAccount);
      await sidebar.clickTransferFunds()
      await account.transfer.expectTransferFundsPage()
      await account.transfer.fillAmountTransfer(amountTransfer)
      await account.transfer.accountFrom(mainAccount)
      await account.transfer.accountTo(accountCreatedId)
      await account.transfer.clickTransfer()
      //Assert
      await expect(account.transfer.locatorTransferCompleteTitle).toBeVisible()
      await account.transfer.confirmationTransferDetails(amountTransfer,mainAccountId,accountCreatedId)
      await sidebar.clickAccountsOverview()

      await account.overview.expectAccountDetails(mainAccountId, mainAccount.finalBalance, mainAccount.availableAmount)
      await account.overview.expectAccountDetails(accountCreatedId, secondAccount.finalBalance, secondAccount.availableAmount)
    });
});