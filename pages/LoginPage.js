export class LoginPage {
    constructor(page) {
        this.page = page;
        //Khai báo các Element
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('button[type="submit"]');
        this.flashMessage = page.locator('#flash');
    }

    //Viết các hành động
    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}