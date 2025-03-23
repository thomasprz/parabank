import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';


export class AdminPage extends BasePage{
    readonly locatorCleanDbButton : Locator
    readonly locatorAdministrationTitle : Locator
    readonly locatorCleanAlertMessage : Locator

    constructor(page:Page){
        super(page)
        this.locatorAdministrationTitle = page.getByRole('heading', {name:'Administration'})
        this.locatorCleanDbButton = page.getByRole('button', {name:'Clean'})
        this.locatorCleanAlertMessage = page.locator('#rightPanel > p')
    }


    async expectAdminPage(){
        await expect(this.page).toHaveURL(/admin/)
    }

    async cleanDatabase(){
        await this.locatorCleanDbButton.click()
    }
}