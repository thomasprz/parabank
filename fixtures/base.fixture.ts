import { pages } from "./pages.fixture";
import { expect, mergeTests } from "@playwright/test";
export {expect} from'@playwright/test'

export const test = mergeTests(pages)