import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage{

    readonly page: Page;
    readonly products: string[];
    readonly productCard: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light',
                      'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket',
                      'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)']
        this.productCard = page.locator('.inventory_item')

    }

    getProduct(name: string){
        return this.productCard.filter({hasText: name})
    }

    async addToCart(name: string){
        const product = this.getProduct(name)
        return product.getByRole('button', { name: 'Add to cart' }).click()
    }

    async removeProduct(name: string){
        const product = this.getProduct(name)
        await expect(product.getByRole('button', {name: 'Remove'})).toBeVisible()
        return product.getByRole('button', {name: 'Remove'}).click()
    }


}