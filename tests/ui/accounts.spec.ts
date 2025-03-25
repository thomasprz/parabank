import { test } from '../fixtures/base.fixture';
import {registerDataFaker} from '../utils/register.utils'

test.describe('Comptes', () => {
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
  
  test('Création d\'un compte "CHECKING"', async ({ account, sidebar}) => {
    // Arrange    
    const accountData = {
      type: "CHECKING",
    };

    // Act
    await sidebar.clickOpenNewAccount();
    await account.open.selectAccountType(accountData.type);
    await account.open.clickOpenNewAccount();    
    const accountId = await account.open.getAccountCreatedId();
    await account.open.clickAccountCreated(accountId);
    await account.details.expectAccountDetailsInformation(accountId, accountData);
  });

  test('Création d\'un compte "SAVINGS"', async ({ account, sidebar}) => {
    // Arrange    
    const accountData = {
      type: "SAVINGS",
    };
    // Act
    await sidebar.clickOpenNewAccount();
    await account.open.selectAccountType(accountData.type);
    await account.open.clickOpenNewAccount();    
    const accountId = await account.open.getAccountCreatedId();
    await account.open.clickAccountCreated(accountId);
    await account.details.expectAccountDetailsInformation(accountId, accountData);
  });
});
