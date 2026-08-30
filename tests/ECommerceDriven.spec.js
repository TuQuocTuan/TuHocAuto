import { test, expect } from '@playwright/test';
import { ECommerce } from "../pages/ECommerce.js";
import checkout from "../data/checkout_data.json";

test.describe('Test ECommerce Driver', () => {
    for (const c of checkout) {
        test(`Toàn bộ luồng mua hàng user: ${c.username}`, async ({ page }) => {
            const ED = new ECommerce(page);

            await test.step(`1. Luồng đăng nhập user: ${c.username}`, async () => {
                await ED.goto();
                await ED.login(c.username, c.password);
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            })

            await test.step(`2.Thêm giỏ hàng user: ${c.username}`, async () => {
                await ED.addtocart(0);
                await expect(ED.giohang).toHaveText('1');
                await ED.nutgiohang.click();
                await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
                await expect(page.locator('div[class="inventory_item_name"]')).toContainText(c.expectedItem);
            })

            await test.step(`3.Luồng thanh toán của user: ${c.username}`, async () => {
                await ED.dencheckout();
                await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
                await ED.checkout(c.firstName, c.lastName, c.postalCode);
                await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
                await expect(page.locator('div[class="inventory_item_name"]')).toContainText(c.expectedItem);
                await ED.nutfinish.click();
                await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
                await expect(ED.message).toHaveText(c.expectedSuccessMsg);
            })
        })
    }
})