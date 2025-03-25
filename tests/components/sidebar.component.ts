import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from '../pages/base.page';

export class SidebarComponent extends BasePage {
    //MENU
    readonly locatorSolutionsLink : Locator
    readonly locatorAboutUsLink : Locator
    readonly locatorServicesLink : Locator
    readonly locatorProductsLink : Locator
    readonly locatorLocationsLink : Locator
    readonly locatorAdminPageLink : Locator
    //LOGIN
    readonly locatorCustomerLoginTitle : Locator
    readonly locatorUsernameInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorLoginButton : Locator
    readonly locatorForgotLoginLink : Locator
    readonly locatorRegisterLink : Locator
    //MENU LOGIN
    readonly locatorOpenAccountLink : Locator
    readonly locatorOverviewLink : Locator
    readonly locatorTransferFundsLink : Locator
    readonly locatorBillPayLink : Locator
    readonly locatorFindTransactionsLink : Locator
    readonly locatorUpdateInfoLink : Locator
    readonly locatorRequestLoanLink : Locator
    readonly locatorLogoutLink : Locator

    constructor(page:Page){
        super(page)
        //MENU
        this.locatorSolutionsLink = page.getByRole('list', {name:'Solutions'})
        this.locatorAboutUsLink = page.getByRole('link', {name:'About Us'})
        this.locatorServicesLink = page.getByRole('link', {name:'Services'})
        this.locatorProductsLink = page.getByRole('link', {name:'Products'})
        this.locatorLocationsLink = page.getByRole('link', {name:'Locations'})
        this.locatorAdminPageLink = page.getByRole('link', {name:'Admin Page'})
        //LOGIN
        this.locatorCustomerLoginTitle = page.getByRole('heading', {name:'Customer Login'})
        this.locatorUsernameInput = page.locator('[name="username"]')
        this.locatorPasswordInput = page.locator('[name="password"]')
        this.locatorLoginButton = page.locator('[value="Log In"]')
        this.locatorForgotLoginLink = page.getByRole('link', {name:'Forgot login info?'})
        this.locatorRegisterLink = page.getByRole('link', {name:'Register'})
        //MENU LOGIN
        this.locatorOpenAccountLink = page.getByRole('link', {name:'Open New Account'})
        this.locatorOverviewLink = page.getByRole('link', {name:'Accounts Overview'})
        this.locatorTransferFundsLink = page.getByRole('link', {name:'Transfer Funds'})
        this.locatorBillPayLink = page.getByRole('link', {name:'Bill Pay'})
        this.locatorFindTransactionsLink = page.getByRole('link', {name:'Find Transactions'})
        this.locatorUpdateInfoLink = page.getByRole('link', {name:'Update Contact Info'})
        this.locatorRequestLoanLink = page.getByRole('link', {name:'Request Loan'})
        this.locatorLogoutLink = page.getByRole('link', {name:'Log Out'})
    }

    async fillLoginForm(username, password){
        await this.locatorUsernameInput.fill(username)
        await this.locatorPasswordInput.fill(password)
    }

    async clickLogin(){
        await this.locatorLoginButton.click()
    }

    async clickOpenNewAccount(){
        await this.locatorOpenAccountLink.click()
    }

    async clickAccountsOverview(){
        await this.locatorOverviewLink.click()
    }

    async clickTransferFunds(){
        await this.locatorTransferFundsLink.click()
    }

    async clickBillPay(){
        await this.locatorBillPayLink.click()
    }

    async clickFindTransactions(){
        await this.locatorFindTransactionsLink.click()
    }

    async clickUpdateContactInfo(){
        await this.locatorUpdateInfoLink.click()
    }

    async clickRequestLoan(){
        await this.locatorRequestLoanLink.click()
    }

    async clickLogout(){
        await this.locatorLogoutLink.click()
    }

    async clickAdminPage(){
        await this.locatorAdminPageLink.click()
    }
    
    async clickRegister(){
        await this.locatorRegisterLink.click()
    }
}
