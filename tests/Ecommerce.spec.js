
import { test, expect } from '@playwright/test';
import { ECommerce } from "../pages/ECommerce";

test.describe('Test ECommerce', () => {
    test('Luồng mua hàng hoàn chỉnh', async ({ page }) => {
        const eCommerce = new ECommerce(page);

        await test.step('1. Kiểm tra Login', async () => {
            await eCommerce.goto();
            await eCommerce.login('standard_user', 'secret_sauce');
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });

        await test.step('2. Kiểm tra thêm giỏ hàng', async () => {
            await eCommerce.addtocart(0);
            await expect(eCommerce.giohang).toHaveText('1');
        });

        await test.step('3. Checkout', async () => {
            await eCommerce.dencheckout();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
            await eCommerce.checkout('a', 'a', '1');
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
            await eCommerce.dentrangfinish();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
            await expect(eCommerce.message).toHaveText('Thank you for your order!');
        })
    });
})