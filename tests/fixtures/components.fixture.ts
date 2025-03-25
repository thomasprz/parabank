import { SidebarComponent } from "../components/sidebar.component";
import {test as componentsTest} from '@playwright/test'

interface Components {
    sidebar: SidebarComponent
}
export const components = componentsTest.extend<Components>({

    sidebar: async({page}, use) => {
        await use(new SidebarComponent(page))
    },
})