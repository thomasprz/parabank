import {test, expect} from '../../fixtures/base.fixture'

test.describe('Connexion', () => {
    test.beforeEach('Naviguer vers la page d\'accueil', async ({home}) => {
        await home.goTo('parabank/index.htm')
        await home.expectHomePage()
    })

    test('Déconnexion de l\'utilisateur', async ({sidebar, home}) => {
        await sidebar.clickLogout()
        await home.expectHomePage()
        await expect(sidebar.locatorCustomerLoginTitle).toBeVisible()
    })
})