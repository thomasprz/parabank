import { test, expect } from '../fixtures/base.fixture';
import {payeeInformationFaker} from '../utils/bill-payment.utils'
import {registerDataFaker} from '../utils/register.utils'

test.describe('Transactions', () => {
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
      //Création utilisateur
     await sidebar.clickRegister();
     await register.fillRegistrationForm(userData);
     await register.clickRegister();
    })

    test('Rechercher une transaction par Date ', async ({ account,sidebar,bill,transaction}) => {
    // Arrange  
    const payee = {
    amountBill :'300.00',
    payeeData : payeeInformationFaker(),
    }
    //Act
    await sidebar.clickAccountsOverview()
    const mainAccountId = await account.overview.getAccountNumber()
    await sidebar.clickBillPay()
    await bill.fillPayeeInformation(payee.payeeData)
    await bill.fillBillDetails(payee.amountBill,payee.payeeData.accountNumber,mainAccountId)
    await bill.clickSendPayment()
    await expect(bill.locatorPaymentCompleteTitle).toBeVisible()
    await bill.expectPaymentComplete(payee.amountBill, payee.payeeData.name, mainAccountId)
    await sidebar.clickAccountsOverview()
    await sidebar.clickFindTransactions()
    const date = await transaction.fillTransactionByDate()
    await transaction.clickTransactionDateButton()
    //Assert
    await expect(transaction.locatorTransactionResults).toBeVisible()
    await transaction.expectTransactionResultsByDate(date,payee.amountBill)
    })

    test('Rechercher une transaction par ID ', async ({ account,sidebar,bill,transaction}) => {
      // Arrange  
      const payee = {
        amountBill :'300.00',
        payeeData : payeeInformationFaker(),
      }
        //Act
        await sidebar.clickAccountsOverview()
        const mainAccountId = await account.overview.getAccountNumber()
        await sidebar.clickBillPay()
        await bill.fillPayeeInformation(payee.payeeData)
        await bill.fillBillDetails(payee.amountBill,payee.payeeData.accountNumber,mainAccountId)
        await bill.clickSendPayment()
        await expect(bill.locatorPaymentCompleteTitle).toBeVisible()
        await bill.expectPaymentComplete(payee.amountBill, payee.payeeData.name, mainAccountId)
        await sidebar.clickAccountsOverview()
        await account.overview.clickAccountNumber(mainAccountId)
        await account.details.clickTransactionBill(payee.payeeData.name)
        const transactionId = await transaction.getTransactionId()
        await sidebar.clickFindTransactions()
        await transaction.fillTransactionById(transactionId)
        await transaction.clickTransactionIdButton()
        //Assert
        await expect(transaction.locatorTransactionResults).toBeVisible()
        await transaction.expectTransactionResultsByAmount(payee.amountBill)
        })
      
    test('Rechercher une transaction par Montant ', async ({ account,sidebar,bill,transaction}) => {
        // Arrange  
        const payee = {
        amountBill :'300.00',
        payeeData : payeeInformationFaker(),
        }
        //Act
        await sidebar.clickAccountsOverview()
        const mainAccountId = await account.overview.getAccountNumber()
        await sidebar.clickBillPay()
        await bill.fillPayeeInformation(payee.payeeData)
        await bill.fillBillDetails(payee.amountBill,payee.payeeData.accountNumber,mainAccountId)
        await bill.clickSendPayment()
        await expect(bill.locatorPaymentCompleteTitle).toBeVisible()
        await bill.expectPaymentComplete(payee.amountBill, payee.payeeData.name, mainAccountId)
        await sidebar.clickFindTransactions()
        await transaction.fillTransactionByAmount(payee.amountBill)
        await transaction.clickTransactionAmountButton()
        //Assert
        await expect(transaction.locatorTransactionResults).toBeVisible()
        await transaction.expectTransactionResultsByAmount(payee.amountBill)
        })

        test('Rechercher une transaction par interval de date ', async ({ account,sidebar,bill,transaction}) => {
          // Arrange  
          const payee = {
          amountBill :'800.00',
          payeeData : payeeInformationFaker(),
          }
          //Act
          await sidebar.clickAccountsOverview()
          const mainAccountId = await account.overview.getAccountNumber()
          await sidebar.clickBillPay()
          await bill.fillPayeeInformation(payee.payeeData)
          await bill.fillBillDetails(payee.amountBill,payee.payeeData.accountNumber,mainAccountId)
          await bill.clickSendPayment()
          await expect(bill.locatorPaymentCompleteTitle).toBeVisible()
          await bill.expectPaymentComplete(payee.amountBill, payee.payeeData.name, mainAccountId)
          await sidebar.clickFindTransactions()
          await transaction.fillTransactionByDateRange()
          await transaction.clickTransactionDateRangeButton()
          //Assert
          await expect(transaction.locatorTransactionResults).toBeVisible()
          await transaction.expectTransactionResultsByAmount(payee.amountBill)
          })
})