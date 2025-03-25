import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class AccountsOverviewPage extends BasePage {
    //LOCATOR
    readonly locatorAccountsOverviewTitle : Locator
    readonly locatorAccountColumnHeader : Locator
    readonly locatorBalanceColumnHeader : Locator
    readonly locatorAvailableAmountColumnHeader : Locator
    readonly locatorTotalRow : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorAccountsOverviewTitle = page.getByRole('heading', {name:'Accounts Overview'})
        this.locatorAccountColumnHeader = page.getByRole('columnheader', {name:'Account'})
        this.locatorBalanceColumnHeader = page.getByRole('columnheader', {name:'Balance*'})
        this.locatorAvailableAmountColumnHeader = page.getByRole('columnheader', {name:'Available Amount'})
        this.locatorTotalRow = page.getByRole('row', {name:'Total'})
    }
    
    async expectAccountsOverviewPage(){
        await expect(this.page).toHaveURL(/overview/)
        await expect(this.locatorAccountsOverviewTitle).toBeVisible()
    }

    async getAccountNumber(){
        const accountId = await this.page.locator('#accountTable tbody tr td a').nth(0).innerText()
        return accountId
    }

    async expectAccountDetails(accountNumber,expectedBalance,availableAmount) {
        const row = this.page.locator('#accountTable tbody tr', { hasText: accountNumber.toString() });
        const balanceCell = row.locator('td:nth-child(2)');
        const balanceAvailable = row.locator('td:nth-child(3)');
        await expect(balanceCell).toHaveText(`$${expectedBalance}`);
        await expect(balanceAvailable).toHaveText(`$${availableAmount}`);
    }

    async clickAccountNumber(accountNumber){
        await this.page.getByRole('link', {name:accountNumber}).click()
    }
}