import { test, expect } from '../fixtures/base.fixture';
import {registerDataFaker} from '../utils/register.utils'
import {updateProfileFaker} from '../utils/profile.utils'

test.describe('Profile', () => {
let userData
  test.beforeEach('Préparation de l\'environnement', async ({admin,register,sidebar}) => {
      //Arrange
      userData = registerDataFaker();
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

  test('Mise à jour de l\'adresse de résidence dans le profile ', async ({profile,sidebar}) => {
    // Arrange  
    const newAddress = updateProfileFaker()
    //Act
    await sidebar.clickUpdateContactInfo()
    await expect(profile.locatorAddressInput).toHaveValue(userData.address)
    await profile.updateAddress(newAddress.address)
    await profile.clickUpdateProfile()
    await expect(profile.locatorProfileUpdatedTitle).toBeVisible()
    await sidebar.clickUpdateContactInfo()
    //Assert
    await profile.expectUpdateProfile(userData.firstname,userData.lastname,newAddress.address,userData.city,userData.state,userData.zipcode,userData.phone)
    })
})