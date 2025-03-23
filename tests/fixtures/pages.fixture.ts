import { AccountsOverviewPage } from "../pages/accounts-overview.page";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import {test as pagesTest} from '@playwright/test'

interface Pages {
    register : RegisterPage
    home : HomePage
    account: {
        overview: AccountsOverviewPage;
    }; 
}

export const pages = pagesTest.extend<Pages>({

    register: async ({page}, use) => {
        await use(new RegisterPage(page))
    },
    home:async ({page}, use) => {
        await use(new HomePage(page))
    },
    account: async ({ page }, use) => {
        const account = {
            overview: new AccountsOverviewPage(page),
        };
        await use(account);
    },

})