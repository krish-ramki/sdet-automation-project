import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly cartFooter: Locator;


    constructor(page: Page){
        this.page = page;
        this.shoppingCartBadge = page.locator('.shopping_cart_badge')
        this.shoppingCartLink = page.locator('.shopping_cart_link')
        this.cartFooter = page.locator('.cart_footer')

    }
    
     async continueShopping(){
        await this.cartFooter.getByRole('button', { name: 'Continue Shopping' }).click();

     }

     async checkout() {
        await this.cartFooter.getByRole('button', { name: 'Checkout' }).click();
    }

}