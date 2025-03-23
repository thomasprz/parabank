import { FullConfig, chromium, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { AdminPage } from '../pages/admin-page.page';
import { registerDataFaker } from './register.utils';
import data from '../data/administration.json'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

async function cleanDb(config: FullConfig) {
    console.log("Exécution du global setup...");
    const browser = await chromium.launch();
    const page = await browser.newPage();

    //CLEAN BDD
    const adminPage = new AdminPage(page)
    console.log("Nettoyage de la base de données...");
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm'); 
    await adminPage.cleanDatabase()
    await expect(adminPage.locatorCleanAlertMessage).toHaveText(data.db_clean)

    //REGISTER USER
    console.log("Création d'un utilisateur...");
    await page.goto('https://parabank.parasoft.com/parabank/register.htm');
    const registerPage = new RegisterPage(page)
    const userData = registerDataFaker()
    await registerPage.expectRegisterPage();
    await registerPage.fillRegistrationForm(userData);
    await registerPage.clickRegister();

    //STOCKAGE .ENV
    console.log("Sauvegarde des identifiants...");
    const envFilePath = path.join(__dirname, '../../.env');
    const envContent = `USERNAME=${userData.username}\nPASSWORD=${userData.password}\n`;
    fs.writeFileSync(envFilePath, envContent, { encoding: 'utf8' }); // Écrit les nouvelles valeurs dans le fichier .env. Mais ces valeurs ne sont pas automatiquement chargées dans l'environnement d'exécution de l'application.
    dotenv.config({ path: envFilePath }); // Recharger le fichier .env mis à jour
    console.log("Les identifiants ont été sauvegardés et chargés dans l'environnement.");
    await browser.close();
}
export default cleanDb;

