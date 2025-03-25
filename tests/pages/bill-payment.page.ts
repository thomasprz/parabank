import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class BillPaymentPage extends BasePage{
    //LOCATOR
    readonly locatorTransferFundsTitle : Locator
    readonly locatorPayeeNameInput : Locator
    readonly locatorAddressInput : Locator
    readonly locatorCityInput : Locator
    readonly locatorStateInput : Locator
    readonly locatorZipcodeInput : Locator
    readonly locatorPhoneInput : Locator
    readonly locatorAccountNumberInput : Locator
    readonly locatorVerifyAccountInput : Locator
    readonly locatorAmountInput : Locator
    readonly locatorFromAccount : Locator
    readonly locatorSendPaymentButton : Locator
    readonly locatorPaymentCompleteTitle : Locator
    readonly locatorAlertSuccess : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorTransferFundsTitle = this.page.getByRole('heading', {name:'Bill Payment Service'})
        this.locatorPayeeNameInput = this.page.locator('[name="payee.name"]')
        this.locatorAddressInput = this.page.locator('[name="payee.address.street"]')
        this.locatorCityInput = this.page.locator('[name="payee.address.city"]')
        this.locatorStateInput = this.page.locator('[name="payee.address.state"]')
        this.locatorZipcodeInput = this.page.locator('[name="payee.address.zipCode"]')
        this.locatorPhoneInput = this.page.locator('[name="payee.phoneNumber"]')
        this.locatorAccountNumberInput = this.page.locator('[name="payee.accountNumber"]')
        this.locatorVerifyAccountInput = this.page.locator('[name="verifyAccount"]')
        this.locatorAmountInput = this.page.locator('[name="amount"]')
        this.locatorFromAccount = this.page.locator('[name="fromAccountId"]')
        this.locatorSendPaymentButton = page.locator('[value="Send Payment"]')
        this.locatorPaymentCompleteTitle = page.getByRole('heading', {name:'Bill Payment Complete'})
        this.locatorAlertSuccess = page.locator('#billpayResult > p').nth(0)
    }

    async expectTransferFundsPage(){
        await expect(this.page).toHaveURL(/billpay/)
    }

    async fillPayeeInformation(payee){
        await this.locatorPayeeNameInput.fill(payee.name)    
        await this.locatorAddressInput.fill(payee.street)
        await this.locatorCityInput.fill(payee.city)
        await this.locatorStateInput.fill(payee.state)
        await this.locatorZipcodeInput.fill(payee.zipCode)
        await this.locatorPhoneInput.fill(payee.phoneNumber)
    }

    async fillBillDetails(amount : string, payeeAccount : string, fromAccount){
        await this.locatorAccountNumberInput.fill(payeeAccount)
        await this.locatorVerifyAccountInput.fill(payeeAccount)
        await this.locatorAmountInput.fill(amount)
        await this.locatorFromAccount.selectOption(fromAccount)
    }

    async clickSendPayment(){
        await this.locatorSendPaymentButton.click()
    }

    async expectPaymentComplete(amount, payeeName, fromAccount ){
        await expect(this.locatorAlertSuccess).toContainText(`Bill Payment to ${payeeName} in the amount of $${amount} from account ${fromAccount} was successful.`)
    }
}