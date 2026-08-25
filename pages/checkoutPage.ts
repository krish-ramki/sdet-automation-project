import {Page, Locator} from '@playwright/test'
import { BasePage } from '../pages/BasePage';


export class CheckoutPage extends BasePage{

    readonly checkoutButtons: Locator;  
    readonly checkoutCompleteContainer: Locator;
    readonly cartFooter: Locator;


    constructor(page: Page){

        super(page);
        this.checkoutButtons = page.locator('.checkout_buttons')
        this.checkoutCompleteContainer = page.locator('.checkout_complete_container')
        this.cartFooter = page.locator('.cart_footer')

    }

    async fillFormFields(field: string, val: string){
        return this.page.getByRole('textbox',{name: field}).fill(val)
    }

    async continueButton(){
        return this.checkoutButtons.getByRole('button', {name: 'Continue'}).click()
    }

    async finish(){
        await this.cartFooter.getByRole('button', {name: 'Finish'}).click()
    }

}