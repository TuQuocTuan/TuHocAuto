import { test, expect } from '@playwright/test';
import { ECommerce } from '../pages/ECommerce';
import { FormDataDriven } from '../pages/FormDataDriven';
import users from "../data/users.json";
import students from "../data/students.json";
import { get } from 'node:http';

test.describe('Kiểm thử đăng nhập Data-Driven', () => {
    for (const user of users) {
        test(`Test đăng nhập với user: ${user.username} | Kết quả mong đợi: ${user.isSuccess ? 'Thành công' : 'Thất bại'}`, async ({ page }) => {
            const eCommerce = new ECommerce(page);

            await eCommerce.goto();
            await eCommerce.login(user.username, user.password);

            if (user.isSuccess) {
                await expect(page).toHaveURL(user.expectedUrl);
            }
            else {
                await expect(eCommerce.errorMessage).toHaveText(user.expectedError);
            }
        })
    }
})

test.describe('Kiểm thử điền form Data-Driven', () => {
    for (const student of students) {
        test(`Kiểm thử chức năng điền form student: ${student.firstName} ${student.lastName}`, async ({ page }) => {
            const formStudent = new FormDataDriven(page);
            await formStudent.goto();
            await formStudent.dienform(student);
            await formStudent.chongioitinh(student.gender);
            await formStudent.submit();
            await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');

            const getCellValue = (label) => page.locator('tr', { hasText: label }).locator('td').nth(1);
            await expect(getCellValue('Student Name')).toHaveText(`${student.firstName} ${student.lastName}`);
            await expect(getCellValue('Student Email')).toHaveText(student.email);
            await expect(getCellValue('Mobile')).toHaveText(student.mobile);
        })
    }
})