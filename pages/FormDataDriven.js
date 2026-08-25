export class FormDataDriven {
    constructor(page) {
        this.page = page;
        this.firstname = page.locator('#firstName');
        this.lastname = page.locator('#lastName');
        this.email = page.locator('#userEmail');
        this.mobile = page.locator('#userNumber');
        this.dateofBirth = page.locator('#dateOfBirthInput');
        this.submitBtn = page.locator('#submit')
        this.modalBody = page.locator('.modal-body');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/automation-practice-form');
    }

    async chongioitinh(gender) {
        await this.page.getByText(gender, { exact: true }).click();
    }

    async dienform(student) {
        await this.firstname.fill(student.firstName);
        await this.lastname.fill(student.lastName);
        await this.email.fill(student.email);
        await this.mobile.fill(student.mobile);
        if (student.dateofBirth) {
            await this.dateofBirth.click();
            await this.page.keyboard.press('Control + A');
            await this.page.fill(student.dateofBirth);
            await this.page.keyboard.press('Enter');
        }
    }

    async submit() {
        await this.submitBtn.click();
    }
}