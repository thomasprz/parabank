import { AccountDetailsPage } from "../pages/account-details.page";
import { AccountsOverviewPage } from "../pages/accounts-overview.page";
import { HomePage } from "../pages/home.page";
import { OpenAccountPage } from "../pages/open-account.page";
import { RegisterPage } from "../pages/register.page";
import {test as pagesTest} from '@playwright/test'
import { TransferFundsPage } from "../pages/transfer-funds.page";
import { AdminPage } from "../pages/admin.page";
import { BillPaymentPage } from "../pages/bill-payment.page";
import {FindTransactionPage} from "../pages/find-transactions.page"
import { ProfilePage } from "../pages/profile.page";
import { RequestLoanPage } from "../pages/request-loan.page";

interface Pages {
    register : RegisterPage
    admin : AdminPage
    home : HomePage
    account: {
        overview: AccountsOverviewPage;
        open : OpenAccountPage
        details : AccountDetailsPage
        transfer : TransferFundsPage
        }; 
    bill : BillPaymentPage
    transaction : FindTransactionPage
    profile : ProfilePage
    loan : RequestLoanPage

}

export const pages = pagesTest.extend<Pages>({

    register: async ({page}, use) => {
        await use(new RegisterPage(page))
    },
    home: async ({page}, use) => {
        await use(new HomePage(page))
    },
    account: async ({ page }, use) => {
        const account = {
            overview: new AccountsOverviewPage(page),
            open : new OpenAccountPage(page),
            details : new AccountDetailsPage(page),
            transfer : new TransferFundsPage(page)
        };
        await use(account);
    },
    admin: async ({page}, use) => {
        await use(new AdminPage(page))
    },
    bill: async ({page}, use) => {
        await use(new BillPaymentPage(page))
    },
    transaction: async ({page}, use) => {
        await use(new FindTransactionPage(page))
    },
    profile: async ({page}, use) => {
        await use(new ProfilePage(page))
    },
    loan: async ({page}, use) => {
        await use(new RequestLoanPage(page))
    },


})