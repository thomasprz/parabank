import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page'

export class RegisterPage extends BasePage {
    //LOCATOR
    readonly locatorRegisterTitle : Locator
    readonly locatorFirstNameInput : Locator
    readonly locatorLastNameInput : Locator
    readonly locatorAddressInput : Locator
    readonly locatorCityInput : Locator
    readonly locatorStateInput : Locator
    readonly locatorZipCodeInput : Locator
    readonly locatorPhoneInput : Locator
    readonly locatorSSNInput : Locator
    readonly locatorUsernameInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorConfirmInput : Locator
    readonly locatorRegisterButton : Locator
    readonly locatorWelcomeTitle : Locator
    readonly locatorAccountCreatedMessage : Locator


    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorRegisterTitle = page.getByRole('heading', {name:'Signing up is easy!'})
        this.locatorFirstNameInput = page.locator('[id="customer.firstName"]')
        this.locatorLastNameInput = page.locator('[id="customer.lastName"]')
        this.locatorAddressInput = page.locator('[id="customer.address.street"]')
        this.locatorCityInput = page.locator('[id="customer.address.city"]')
        this.locatorStateInput = page.locator('[id="customer.address.state"]')
        this.locatorZipCodeInput = page.locator('[id="customer.address.zipCode"]')
        this.locatorPhoneInput = page.locator('[id="customer.phoneNumber"]')
        this.locatorSSNInput = page.locator('[id="customer.ssn"]')
        this.locatorUsernameInput = page.locator('[id="customer.username"]')
        this.locatorPasswordInput = page.locator('[id="customer.password"]')
        this.locatorConfirmInput = page.locator('[id="repeatedPassword"]')
        this.locatorRegisterButton = page.locator('.button', {hasText:'Register'})
        this.locatorWelcomeTitle = page.locator('.title')
        this.locatorAccountCreatedMessage = page.locator('#rightPanel p')

    }

    async expectRegisterPage(){
        await expect(this.page).toHaveURL(/register/)
    }

    async fillRegistrationForm(user){
        await this.locatorFirstNameInput.fill(user.firstname)
        await this.locatorLastNameInput.fill(user.lastname)
        await this.locatorAddressInput.fill(user.address)
        await this.locatorCityInput.fill(user.city)
        await this.locatorStateInput.fill(user.state)
        await this.locatorZipCodeInput.fill(user.zipcode)
        await this.locatorPhoneInput.fill(user.phone)
        await this.locatorSSNInput.fill(user.ssn)
        await this.locatorUsernameInput.fill(user.username)
        await this.locatorPasswordInput.fill(user.password)
        await this.locatorConfirmInput.fill(user.password)
    }

    async clickRegister(){
        await this.locatorRegisterButton.click()
    }

    async expectLoggedIn(username){
        await expect(this.locatorWelcomeTitle).toContainText(`Welcome ${username}`)
    }
}