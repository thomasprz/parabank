import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page'

export class AccountDetailsPage extends BasePage {
    //LOCATOR
    readonly locatorAccountDetailsTitle : Locator
    readonly locatorAccountNumberField : Locator
    readonly locatorAccountTypeField : Locator
    readonly locatorBalanceField : Locator
    readonly locatorAvailableField : Locator
    readonly locatorAccountActivityTitle : Locator
    readonly locatorActivityPeriod : Locator
    readonly locatorTypeTransaction : Locator
    readonly locatorGoButton : Locator


    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorAccountDetailsTitle = page.getByRole('heading', {name:'Account Details'})
        this.locatorAccountNumberField = page.getByRole('row', {name:'Account Number:'})
        this.locatorAccountTypeField = page.getByRole('row', {name:'Account Type:'})
        this.locatorBalanceField = page.getByRole('row', {name:'Balance:'})
        this.locatorAvailableField = page.getByRole('row', {name:'Available:'})
        this.locatorAccountActivityTitle = page.getByRole('heading', {name:'Account Activity'})
        this.locatorActivityPeriod = page.getByRole('row', {name:'Activity Period:'})
        this.locatorTypeTransaction = page.getByRole('row', {name:'Type:'})
        this.locatorGoButton = page.locator('[value="Go"]')
    }


    async expectAccountDetailsInformation(id, accountData){
        await expect(this.locatorAccountNumberField).toContainText(`Account Number:	${id}`)
        await expect(this.locatorAccountTypeField).toContainText(`Account Type: ${accountData.type}`)
    }

    async clickTransactionBill(payee){
        await this.page.getByRole('link', {name:`Bill Payment to ${payee}`}).click()
    }

}