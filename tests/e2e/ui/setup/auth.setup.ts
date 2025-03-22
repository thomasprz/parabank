import {test as setup} from '../../fixtures/base.fixture'

setup('Connexion avec un utilisateur standard', async ({sidebar}) => {
    await sidebar.goTo('parabank/index.htm')
    await sidebar.fillLoginForm(process.env.USERNAME, process.env.PASSWORD)
    await sidebar.clickLogin()
})