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
    readonly locatorFromAccountInput : Locator
    readonly locatorSendPaymentButton : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorTransferFundsTitle = this.page.getByRole('heading', {name:'Bill Payment Service'})
        this.locatorPayeeNameInput = this.page.getByRole('textbox', {name:'Payee Name:'})
        this.locatorAddressInput = this.page.getByRole('textbox', {name:'Address:'})
        this.locatorCityInput = this.page.getByRole('textbox', {name:'City:	'})
        this.locatorStateInput = this.page.getByRole('textbox', {name:'State:'})
        this.locatorZipcodeInput = this.page.getByRole('textbox', {name:'Zip Code:'})
        this.locatorPhoneInput = this.page.getByRole('textbox', {name:'Phone #:'})
        this.locatorAccountNumberInput = this.page.getByRole('textbox', {name:'Account #:'})
        this.locatorVerifyAccountInput = this.page.getByRole('textbox', {name:'Verify Account #:'})
        this.locatorAmountInput = this.page.getByRole('textbox', {name:'Amount: $'})
        this.locatorFromAccountInput = this.page.getByRole('textbox', {name:'From account #:'})
        this.locatorSendPaymentButton = page.locator('[value="Send Payment"]')
    }

    async expectTransferFundsPage(){
        await expect(this.page).toHaveURL(/billpay/)
    }
}