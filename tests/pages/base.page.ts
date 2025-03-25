import {Page,Locator,expect} from '@playwright/test'

export class BasePage {
    readonly page : Page

    constructor(page:Page){
        this.page = page
    }

    async goTo(url) {
        await this.page.goto(url)   
    }

}