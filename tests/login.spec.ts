import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test('User can login successfully', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory/)

})

test('Login with invalid pwd', async({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'invalidpwd')
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')

})

test('Login with empty username', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('', 'secret_sauce')
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required')

})

test('Login with empty password', async({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', '')
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required')

})

test('Product appears on inventory page', async({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.getProduct('Sauce Labs Backpack')).toBeVisible()
    await inventoryPage.productCard.count()
    
})

test('Select single product and add to cart', async({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack')

    const cartPage = new CartPage(page);
    await expect(cartPage.shoppingCartBadge).toHaveText('1')

    
})

test('Add multiple products to cart', async({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack')

    const cartPage = new CartPage(page);
    await expect(cartPage.shoppingCartBadge).toHaveText('1')
    
    await inventoryPage.addToCart('Sauce Labs Onesie')
    await expect(cartPage.shoppingCartBadge).toHaveText('2')

    await inventoryPage.addToCart('Sauce Labs Fleece Jacket')
    await expect(cartPage.shoppingCartBadge).toHaveText('3')

})

test('Remove products from cart', async({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack')

    await inventoryPage.removeProduct('Sauce Labs Backpack')

})

test('Complete checkout flow', async({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack')

    const cartPage = new CartPage(page);
    await cartPage.shoppingCartLink.click()
    await cartPage.continueShopping()

    await inventoryPage.addToCart('Sauce Labs Onesie')
    await cartPage.shoppingCartLink.click()
    
    await cartPage.checkout()

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillFormFields('First Name', 'fname')
    await checkoutPage.fillFormFields('Last Name', 'lname')
    await checkoutPage.fillFormFields('Zip/Postal Code', '99999')
    await checkoutPage.continueButton()
    await checkoutPage.finish()

    await expect(checkoutPage.checkoutCompleteContainer.getByText('Thank you for your order!')).toBeVisible()

})

test('Logout', async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click() 


    const burger_button = page.locator('.bm-burger-button')
    await burger_button.click()

    await page.locator('.bm-item-list').getByText('Logout').click()
})


