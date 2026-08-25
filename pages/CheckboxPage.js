export class CheckboxPage {
    constructor(page) {
        this.page = page;
        this.checkbox = page.locator('input[type="checkbox"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
    }

    async check(stt) {
        await this.checkbox.nth(stt).check();
    }

    async uncheck(stt) {
        await this.checkbox.nth(stt).uncheck();
    }
}