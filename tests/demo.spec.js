import { test, expect } from '@playwright/test';

test('Test kịch bản đăng nhập thực tế', async ({ page }) => {
    //Điều hướng nơi cần tới
    await page.goto('https://the-internet.herokuapp.com/login');

    //Điền username và password
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');

    //Click vào nút login
    await page.locator('button[type="submit"]').click();

    //Kiểm tra URL đã sang trang secure chưa
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');

    //Kiểm tra thông báo flash message màu xanh có hiện lên không
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toBeVisible();
    await expect(flashMessage).toHaveText('You logged into a secure');
})