import {test,expect} from '@playwright/test'

test('User can login successfully', async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()
    await expect(page).toHaveURL(/inventory/)

})

test('Login with invalid pwd', async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('invalidpwd')
    await page.getByRole('button', {name: 'Login'}).click()
    const error = page.locator('.error-message-container h3')
    await expect(error).toBeVisible()
    await expect(error).toHaveText('Epic sadface: Username and password do not match any user in this service')

})

test('Login with empty username', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()
    const error = page.locator('.error-message-container h3')
    await expect(error).toBeVisible()
    await expect(error).toHaveText('Epic sadface: Username is required')

})

test('Login with empty password', async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('')
    await page.getByRole('button', {name: 'Login'}).click()
    const error = page.locator('.error-message-container h3')
    await expect(error).toBeVisible()
    await expect(error).toHaveText('Epic sadface: Password is required')

})

test('Product appears on inventory page', async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    const product = page.getByText('Sauce Labs Backpack')
    await expect(product).toBeVisible()

})

test('Select single product and add to cart', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()
    await page.getByText('Sauce Labs Backpack').locator('..').getByRole('button', {name: 'Add to cart'}).click()
    const badge = page.locator('.shopping_cart_badge')
    await expect(badge).toHaveText('1')

})

test('Add multiple products to cart', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()
    await page.getByText('Sauce Labs Backpack').locator('..').getByRole('button', {name: 'Add to cart'}).click()
    const badge = page.locator('.shopping_cart_badge')
    await expect(badge).toHaveText('1')
    await page.getByText('Sauce Labs Onesie').locator('..').getByRole('button', {name: 'Add to cart'}).click()
    await expect(badge).toHaveText('2')
    await page.getByText('Sauce Labs Fleece Jacket').locator('..').getByRole('button', {name: 'Add to cart'}).click()
    await expect(badge).toHaveText('3')

})

test('Remove products from cart', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()
    const productRow = page.getByText('Sauce Labs Backpack').locator('..')
    await productRow.getByRole('button', {name: 'Add to cart'}).click()
    await productRow.getByRole('button', {name: 'Remove'}).click()

})

test('Complete checkout flow', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()
    await page.getByText('Sauce Labs Backpack').locator('..').getByRole('button', {name: 'Add to cart'}).click()
    await page.locator('.shopping_cart_link').click()
    await page.getByRole('button', {name: 'Continue Shopping'}).click()
    await page.getByText('Sauce Labs Onesie').locator('..').getByRole('button', {name: 'Add to cart'}).click()
    await page.locator('.shopping_cart_link').click()
    await page.getByRole('button', {name: 'Checkout'}).click()
    await page.getByPlaceholder('First Name').fill('fname')
    await page.getByPlaceholder('Last Name').fill('lname')
    await page.getByPlaceholder('Zip/Postal Code').fill('99999')
    await page.getByRole('button', {name: 'Continue'}).click()
    await page.getByRole('button', {name: 'Finish'}).click()
    await expect(page.getByText('Thank you for your order!')).toBeVisible()

})

test('Logout', async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    const burger_button = page.locator('.bm-burger-button')
    await burger_button.click()

    await page.locator('.bm-item-list').getByText('Logout').click()
})


