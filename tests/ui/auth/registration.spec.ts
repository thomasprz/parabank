import {test, expect} from '../../fixtures/base.fixture'
import {registerDataFaker} from '../../utils/register.utils'
import data from '../../data/register.json'

test.describe('Inscription', () => {
test.use({ storageState: { cookies: [], origins: [] } });
    test.beforeEach('Naviguer vers la page d\'inscription', async ({register}) => {
        await register.goTo('parabank/register.htm')
        await register.expectRegisterPage()
    })

    test('Création d\'un compte utilisateur', async ({register}) => {
        //Arrange
        const userData = registerDataFaker()
        //Act
        await register.fillRegistrationForm(userData)
        await register.clickRegister()
        //Assert
        await expect(register.locatorAccountCreatedMessage).toHaveText(data.accountCreated)
        await register.expectLoggedIn(userData.username)
    })
})