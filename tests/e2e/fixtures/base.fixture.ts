import { pages } from "./pages.fixture";
import { sidebar } from "./sidebar.fixture";
import { mergeTests } from "@playwright/test";
export {expect} from'@playwright/test'

export const test = mergeTests(pages,sidebar)