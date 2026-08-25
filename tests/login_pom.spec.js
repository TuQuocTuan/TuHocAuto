import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'node:console';

test.describe('Kiểm tra đăng nhập', () => {
    test('Đăng nhập thành công', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
        await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
    });

    test('Đăng nhập thất bại', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('tomsmith', 'MatKhauSai');

        await expect(loginPage.flashMessage).toContainText('Your password is invalid!');
    });
});