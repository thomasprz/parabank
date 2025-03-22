import { SidebarComponent } from "../components/sidebar.component";
import {test as componentsTest} from '@playwright/test'

interface Sidebar {
    sidebar: SidebarComponent
}

export const sidebar = componentsTest.extend<Sidebar>({

    sidebar: async({page}, use) => {
        await use(new SidebarComponent(page))
    },
})