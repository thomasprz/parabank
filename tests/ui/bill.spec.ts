import { test, expect } from '../fixtures/base.fixture';
import {payeeInformationFaker} from '../utils/bill-payment.utils'
import {registerDataFaker} from '../utils/register.utils'

test.describe('Paiement', () => {
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
  test('Paiement d\'une facture d\'un compte à un autre', async ({ account,sidebar,bill}) => {
      // Arrange  
      const payee = {
        accountType : "CHECKING",
        amountBill :'300.00',
        payeeData : payeeInformationFaker(),
      }
      const mainAccount = {
        initialBalance : '1000.00',
        initialAvailableAmount : '1000.00',
        finalBalance : '700.00',
        finalAvailableAmount : '700.00'
    }

    //Act
    await sidebar.clickAccountsOverview()
    const mainAccountId = await account.overview.getAccountNumber()
    await account.overview.expectAccountDetails(mainAccountId,mainAccount.initialBalance,mainAccount.initialAvailableAmount )
    await sidebar.clickOpenNewAccount();
    await sidebar.clickOpenNewAccount();
    await account.open.selectAccountType(payee.accountType);
    await account.open.clickOpenNewAccount();    
    const accountPayeeId = await account.open.getAccountCreatedId();
    await sidebar.clickBillPay()
    await bill.fillPayeeInformation(payee.payeeData)
    await bill.fillBillDetails(payee.amountBill,accountPayeeId,mainAccountId)
    await bill.clickSendPayment()
    //Assert
    await expect(bill.locatorPaymentCompleteTitle).toBeVisible()
    await bill.expectPaymentComplete(payee.amountBill, payee.payeeData.name, mainAccountId)
    await sidebar.clickAccountsOverview()
    await account.overview.expectAccountDetails(mainAccountId,mainAccount.finalBalance,mainAccount.finalAvailableAmount )
    })
})