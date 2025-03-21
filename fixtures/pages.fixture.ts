import { RegisterPage } from "../pages/register.page";
import {test as pagesTest} from '@playwright/test'
interface Pages {
    register : RegisterPage
}

export const pages = pagesTest.extend<Pages>({

    register: async ({page}, use) => {
        await use(new RegisterPage(page))
    },

})