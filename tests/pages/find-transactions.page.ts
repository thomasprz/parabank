import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class FindTransactionPage extends BasePage{
    readonly locatorFindTransactionTitle : Locator
    readonly locatorTransactionIdInput : Locator
    readonly locatorTransactionDateInput : Locator
    readonly locatorTransactionDateFromInput : Locator
    readonly locatorTransactionDateToInput : Locator
    readonly locatorTransactionAmountInput : Locator
    readonly locatorFindTransactionIdButton : Locator
    readonly locatorFindTransactionDateButton : Locator
    readonly locatorFindTransactionDateRangeButton : Locator
    readonly locatorFindTransactionAmountButton : Locator
    readonly locatorTransactionResults : Locator

    constructor(page:Page){
        super(page)
        this.locatorFindTransactionTitle = page.getByRole('heading', {name:'Find Transactions'})
        this.locatorTransactionIdInput = page.locator('#transactionId')
        this.locatorTransactionDateInput = page.locator('#transactionDate')
        this.locatorTransactionDateFromInput = page.locator('#fromDate')
        this.locatorTransactionDateToInput = page.locator('#toDate')
        this.locatorTransactionAmountInput = page.locator('#amount')
        this.locatorFindTransactionIdButton = page.locator('#findById')
        this.locatorFindTransactionDateButton = page.locator('#findByDate')
        this.locatorFindTransactionDateRangeButton = page.locator('#findByDateRange')
        this.locatorFindTransactionAmountButton = page.locator('#findByAmount')
        this.locatorTransactionResults = page.getByRole('heading', {name:'Transaction Results'})
    }

    async fillTransactionById(id){
        await this.locatorTransactionIdInput.fill(id)
    }

    async clickTransactionIdButton(){
        await this.locatorFindTransactionIdButton.click()
    }

    async fillTransactionByDate(){
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${month}-${day}-${year}`; // Format MM-DD-YYYY
        await this.locatorTransactionDateInput.fill(formattedDate);
        return formattedDate;
    }

    async clickTransactionDateButton(){
        await this.locatorFindTransactionDateButton.click()
    }

    async fillTransactionByDateRange(){
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formatDate = (date) => {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        };

        const fromDate = formatDate(yesterday);
        const toDate = formatDate(tomorrow);

        await this.locatorTransactionDateFromInput.fill(fromDate);
        await this.locatorTransactionDateToInput.fill(toDate);
        }

    async clickTransactionDateRangeButton(){
        await this.locatorFindTransactionDateRangeButton.click()
    }

    async fillTransactionByAmount(montant){
        await this.locatorTransactionAmountInput.fill(montant)
    }

    async clickTransactionAmountButton(){
        await this.locatorFindTransactionAmountButton.click()
    }

    async expectTransactionResultsByDate(date, amount){
        const row = this.page.locator('#transactionTable tbody tr', { hasText: date });
        await expect(row).toContainText(`$${amount}`);
    }

    async expectTransactionResultsByAmount(amount) {
        const row = this.page.locator('#transactionTable tbody tr', { hasText: `$${amount}` });
        await expect(row).toBeVisible();
    }

    async getTransactionId(){
        const transactionId = await this.page.locator('#rightPanel td >> nth=1').textContent();
        return transactionId
    }
}