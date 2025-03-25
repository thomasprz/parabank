import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page'

export class OpenAccountPage extends BasePage {
    //LOCATOR
    readonly locatorOpenAccountTitle : Locator
    readonly locatorTypeAccount : Locator
    readonly locatorTransferFunds : Locator
    readonly locatorOpenNewAccountButton : Locator
    readonly locatorAccountOpenedMessage : Locator
    readonly locatorNewAccountId : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorOpenAccountTitle = page.getByRole('heading', {name:'Open New Account'})
        this.locatorTypeAccount = page.locator('#type')
        this.locatorTransferFunds = page.locator('#fromAccountId')
        this.locatorOpenNewAccountButton = page.locator('[value="Open New Account"]')
        this.locatorAccountOpenedMessage = page.getByRole('heading', {name:'Account Opened!'})
        this.locatorNewAccountId = page.locator('#newAccountId')
    }

    
    async expectOpenAccountPage(){
        await expect(this.page).toHaveURL(/openaccount/)
        await expect(this.locatorOpenAccountTitle).toBeVisible()
    }

    async selectAccountType(type) {
        await this.locatorTypeAccount.selectOption({ label: type });
    }

    async selectAccountTransferFrom(account){
        await this.locatorTransferFunds.selectOption(account)
    } 

    async clickOpenNewAccount(){
        await this.locatorOpenNewAccountButton.click()
    }

    async clickAccountCreated(id){
        await this.locatorNewAccountId.click()
    }

    async getAccountCreatedId(){
        const accountId = await this.locatorNewAccountId.innerText()
        return accountId
    }
}