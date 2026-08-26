import {test as base} from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { InventoryPage } from './pages/InventoryPage'
import { CartPage } from './pages/cartPage'
import { CheckoutPage } from './pages/checkoutPage'


type MyFixtures = {
    inventoryPage: InventoryPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
}

export const test = base.extend<MyFixtures> ({
    inventoryPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')

        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage)
    },
     
    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page)
        await    use(cartPage)
    },

    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    },
})

export {expect} from '@playwright/test'

