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
}