import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class ProfilePage extends BasePage{
    readonly locatorUpdateProfileTitle : Locator
    readonly locatorFirstNameInput : Locator
    readonly locatorLastNameInput : Locator
    readonly locatorAddressInput : Locator
    readonly locatorCityInput : Locator
    readonly locatorStateInput : Locator
    readonly locatorZipCodeInput : Locator
    readonly locatorPhoneInput : Locator
    readonly locatorUpdateProfilButton : Locator
    readonly locatorProfileUpdatedTitle : Locator

    constructor(page:Page){
        super(page)
        this.locatorUpdateProfileTitle = this.page.getByRole('heading', {name:'Update Profile'})
        this.locatorFirstNameInput  = page.locator('[name="customer.firstName"]')
        this.locatorLastNameInput  = page.locator('[name="customer.lastName"]')
        this.locatorAddressInput  = page.locator('[name="customer.address.street"]')
        this.locatorCityInput  = page.locator('[name="customer.address.city"]')
        this.locatorStateInput  = page.locator('[name="customer.address.state"]')
        this.locatorZipCodeInput  = page.locator('[name="customer.address.zipCode"]')
        this.locatorPhoneInput  = page.locator('[name="customer.phoneNumber"]')
        this.locatorUpdateProfilButton = page.locator('[value="Update Profile"]')
        this.locatorProfileUpdatedTitle = page.getByRole('heading', {name:'Profile Updated'})
    }

    async expectProfilePage(){
        await expect(this.page).toHaveURL(/updateprofile/)
    }

    async updateFirstName(firstName){
        await this.locatorFirstNameInput.fill(firstName)
    }
    async updateLastName(lastName){
        await this.locatorLastNameInput.fill(lastName)
    }
    async updateAddress(address){
        await this.locatorAddressInput.fill(address)
    }
    async updateCity(city){
        await this.locatorCityInput.fill(city)
    }
    async updateState(state){
        await this.locatorStateInput.fill(state)
    }
    async updateZipCode(zipCode){
        await this.locatorZipCodeInput.fill(zipCode)
    }
    async updatePhone(phone){
        await this.locatorPhoneInput.fill(phone)
    }
    async clickUpdateProfile(){
        await this.locatorUpdateProfilButton.click()
    }

    async expectUpdateProfile(firstname, lastname, address, city, state, zipcode, phone){
        await expect(this.locatorFirstNameInput).toHaveValue(firstname)
        await expect(this.locatorLastNameInput).toHaveValue(lastname)
        await expect(this.locatorAddressInput).toHaveValue(address)
        await expect(this.locatorCityInput).toHaveValue(city)
        await expect(this.locatorStateInput).toHaveValue(state)
        await expect(this.locatorZipCodeInput).toHaveValue(zipcode)
        await expect(this.locatorPhoneInput).toHaveValue(phone)
    }
}