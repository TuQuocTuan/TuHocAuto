export class AddElement {
    constructor(page) {
        this.page = page;
        this.nut = page.locator('button[onclick="addElement()"]');
        this.nutxoa = page.locator('button[onclick="deleteElement()"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    }

    async AddElement(solan) {
        for (let i = 0; i < solan; i++) {
            await this.nut.click();
        }

    }

    async nhanElement(stt) {
        await this.nutxoa.nth(stt).click();
    }
}