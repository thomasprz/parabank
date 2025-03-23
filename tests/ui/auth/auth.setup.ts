import {test as setup} from '../../fixtures/base.fixture'
import { expect } from '../../fixtures/base.fixture'

setup('Connexion avec un utilisateur standard', async ({page,sidebar,account}) => {
    await sidebar.goTo('parabank/index.htm')
    await sidebar.fillLoginForm(process.env.USERNAME, process.env.PASSWORD)
    await sidebar.clickLogin()
    await account.overview.expectAccountsOverviewPage()
    await expect(account.overview.locatorAccountsOverviewTitle).toBeVisible()
    await page.context().storageState({ path: '.auth/user.json' });
})