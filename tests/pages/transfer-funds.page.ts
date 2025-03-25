import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class TransferFundsPage extends BasePage{
    //LOCATOR
    readonly locatorTransferFundsTitle : Locator
    readonly locatorAmountInput : Locator
    readonly locatorFromAccount : Locator
    readonly locatorToAccount : Locator
    readonly locatorTransferButton : Locator
    readonly locatorTransferCompleteTitle : Locator
    readonly locatorTransferConfirmationData : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorTransferFundsTitle = this.page.getByRole('heading', {name:'Transfer Funds'})
        this.locatorAmountInput = page.locator('#amount')
        this.locatorFromAccount = page.locator('#fromAccountId')
        this.locatorToAccount = page.locator('#toAccountId')
        this.locatorTransferButton = page.locator('[value="Transfer"]')
        this.locatorTransferCompleteTitle = page.getByRole('heading', {name:'Transfer Complete!'})
        this.locatorTransferConfirmationData = page.locator('#showResult > p').nth(0)
    }

    async expectTransferFundsPage(){
        await expect(this.page).toHaveURL(/transfer/)
    }

    async fillAmountTransfer(amount){
        await this.locatorAmountInput.fill(amount)
    }

    async accountFrom(accountId){
        await this.locatorFromAccount.selectOption(accountId)
    }

    async accountTo(accountId){
        await this.locatorToAccount.selectOption(accountId)
    }

    async clickTransfer(){
        await this.locatorTransferButton.click()
    }

    async confirmationTransferDetails(amount, accountFrom, accountTo) {
        await expect(this.locatorTransferConfirmationData).toContainText(`$${amount} has been transferred from account #${accountFrom} to account #${accountTo}.`);
    }
}