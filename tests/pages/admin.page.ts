import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';


export class AdminPage extends BasePage{
    readonly locatorCleanDbButton : Locator
    readonly locatorAdministrationTitle : Locator
    readonly locatorCleanAlertMessage : Locator
    readonly locatorInitialBalanceInput : Locator
    readonly locatorMinimumBalanceInput : Locator
    readonly locatorSubmitButton : Locator
    readonly locatorAlertSuccess : Locator

    constructor(page:Page){
        super(page)
        this.locatorAdministrationTitle = page.getByRole('heading', {name:'Administration'})
        this.locatorCleanDbButton = page.getByRole('button', {name:'Clean'})
        this.locatorCleanAlertMessage = page.locator('#rightPanel > p')
        this.locatorInitialBalanceInput = page.locator("#initialBalance")
        this.locatorMinimumBalanceInput = page.locator('#minimumBalance')
        this.locatorSubmitButton = page.locator('[value="Submit"]')
        this.locatorAlertSuccess = page.locator('.title > p')
    }

    async expectAdminPage(){
        await expect(this.page).toHaveURL(/admin/)
    }

    async cleanDatabase(){
        await this.locatorCleanDbButton.click()
    }

    async setApplicationSettings(settings){
        await this.locatorInitialBalanceInput.fill(settings.initialBalance)
        await this.locatorMinimumBalanceInput.fill(settings.minimumBalance)
    }

    async clickSubmitButton(){
        await this.locatorSubmitButton.click()
    }
}