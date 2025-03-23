import { pages } from "./pages.fixture";
import { components } from "./components.fixture";
import { mergeTests } from "@playwright/test";
export {expect} from'@playwright/test'

export const test = mergeTests(pages,components)