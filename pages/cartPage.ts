import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from '../pages/BasePage';


export class CartPage extends BasePage {
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly cartFooter: Locator;


    constructor(page: Page){
        super(page);
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