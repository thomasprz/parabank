import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page'

export class OpenAccountPage extends BasePage {
    //LOCATOR
    readonly locatorOpenAccountTitle : Locator
    readonly locatorTypeAccount : Locator
    readonly locatorTransferFunds : Locator
    //
    readonly locatorAccountOpenedMessage : Locator
    readonly locatorNewAccountId : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorOpenAccountTitle = page.getByRole('heading', {name:'Open New Account'})
        this.locatorTypeAccount = page.locator('#type')
        this.locatorTransferFunds = page.locator('#fromAccountId')

        //
        this.locatorAccountOpenedMessage = page.getByRole('heading', {name:'Account Opened!'})
        this.locatorNewAccountId = page.locator('#newAccountId')
    }

    
    async expectOpenAccountPage(){
        await expect(this.page).toHaveURL(/openaccount/)
    }

    async selectAccountType(account){
        await this.locatorTypeAccount.selectOption(account)
    } 

    async selectAccountTransferFrom(account){
        await this.locatorTransferFunds.selectOption(account)
    } 

    async accountCreatedId(){
        const accountId = await this.locatorNewAccountId.innerText()
        return accountId
    }

    async clickAccountCreated(id){
        await this.locatorNewAccountId.click()
    }
}