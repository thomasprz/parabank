import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class HomePage extends BasePage {
    //LOCATOR


    constructor(page:Page){
        super(page)
        //LOCATOR

    }

    async expectHomePage(){
        await expect(this.page).toHaveURL('parabank/index.htm')
    }
}