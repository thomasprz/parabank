import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class TransferFundsPage extends BasePage{
    //LOCATOR
    readonly locatorTransferFundsTitle : Locator
    readonly locatorAmountInput : Locator
    readonly locatorFromAccount : Locator
    readonly locatorToAccount : Locator
    readonly locatorTransferButton : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorTransferFundsTitle = this.page.getByRole('heading', {name:'Transfer Funds'})
        this.locatorAmountInput = page.locator('#amount')
        this.locatorFromAccount = page.locator('#fromAccountId')
        this.locatorToAccount = page.locator('#toAccountId')
        this.locatorTransferButton = page.locator('[value="Transfer"]')
    }

    async expectTransferFundsPage(){
        await expect(this.page).toHaveURL(/transfer/)
    }
}