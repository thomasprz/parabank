import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from '../pages/base.page';

export class SidebarComponent extends BasePage {
    //LOCATOR
    //MENU
    readonly locatorSolutionsLink : Locator
    readonly locatorAboutUsLink : Locator
    readonly locatorServicesLink : Locator
    readonly locatorProductsLink : Locator
    readonly locatorLocationsLink : Locator
    readonly locatorAdminPageLink : Locator

    //LOGIN
    readonly locatorUsernameInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorLoginButton : Locator
    readonly locatorForgotLoginLink : Locator
    readonly locatorRegisterLink : Locator


    constructor(page:Page){
        super(page)
        //MENU
        //LOCATOR
        this.locatorSolutionsLink = page.getByRole('list', {name:'Solutions'})
        this.locatorAboutUsLink = page.getByRole('link', {name:'About Us'})
        this.locatorServicesLink = page.getByRole('link', {name:'Services'})
        this.locatorProductsLink = page.getByRole('link', {name:'Products'})
        this.locatorLocationsLink = page.getByRole('link', {name:'Locations'})
        this.locatorAdminPageLink = page.getByRole('link', {name:'Admin Page'})
        //LOGIN
        this.locatorUsernameInput = page.locator('[name="username"]')
        this.locatorPasswordInput = page.locator('[name="password"]')
        this.locatorLoginButton = page.locator('[value="Log In"]')
        this.locatorForgotLoginLink = page.getByRole('link', {name:'Forgot login info?'})
        this.locatorRegisterLink = page.getByRole('link', {name:'Register'})
    }

    async fillLoginForm(username, password){
        await this.locatorUsernameInput.fill(username)
        await this.locatorPasswordInput.fill(password)
    }

    async clickLogin(){
        await this.locatorLoginButton.click()
    }

}