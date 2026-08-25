export class ECommerce {
    constructor(page) {
        this.page = page;
        this.username = page.locator('input[placeholder="Username"]');
        this.password = page.locator('#password');
        this.nutlogin = page.locator('input[class="submit-button btn_action"]');
        this.nutthemgiohang = page.locator('button[class="btn btn_primary btn_small btn_inventory "]');
        this.giohang = page.locator('span[class="shopping_cart_badge"]');
        this.nutgiohang = page.locator('a[class="shopping_cart_link"]');
        this.nutCheckout = page.locator('button[data-test="checkout"]');
        this.firstname = page.locator('#first-name');
        this.lastname = page.locator('#last-name');
        this.zip = page.locator('#postal-code');
        this.nutcontinue = page.locator('input[class="submit-button btn btn_primary cart_button btn_action"]');
        this.nutfinish = page.locator('button[class="btn btn_action btn_medium cart_button"]');
        this.message = page.locator('h2[class="complete-header"]');
        this.errorMessage = page.locator('h3[data-test="error"]');
        
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.nutlogin.click();
    }

    async addtocart(stt) {
        await this.nutthemgiohang.nth(stt).click();
    }

    async dencheckout() {
        await this.nutgiohang.click();
        await this.nutCheckout.click();
    }

    async checkout(firstname, lastname, zip) {
        await this.nutgiohang.click();
        await this.nutCheckout.click();
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.zip.fill(zip);
        await this.nutcontinue.click();

    }

    async dentrangfinish() {
        await this.nutfinish.click();
    }
}