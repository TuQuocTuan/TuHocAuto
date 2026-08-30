import { test, expect } from '@playwright/test';

test.describe('Các loại thông báo', () => {
    test('Dạng: ', async ({ page }) => {
        await test.step('1.Alert', async () => {
            await page.goto('https://demoqa.com/alerts');

            page.once('dialog', async (dialog) => {
                await expect(dialog.message()).toBe('You clicked a button');
                await dialog.accept();
            })
            const button = await page.locator('#alertButton');
            await button.click();

        })

        await test.step('2.Alert xuất hiện sau 5s', async () => {
            const [dialog] = await Promise.all([
                page.waitForEvent('dialog'),
                page.locator('#timerAlertButton').click()
            ])
            await expect(dialog.message()).toBe('This alert appeared after 5 seconds');
            await dialog.accept();
        })

        await test.step('3.Confirm box', async () => {
            page.once('dialog', async (dialog) => {
                await expect(dialog.message()).toBe('Do you confirm action?');
                await dialog.dismiss();
            })
            await page.locator('#confirmButton').click();
            await expect(page.locator('#confirmResult')).toBeVisible();
            await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');
        })

        await test.step('4.Prompt box', async () => {
            page.once('dialog', async (dialog) => {
                await expect(dialog.message()).toBe('Please enter your name');
                await dialog.accept('Tu Quoc Tuan');
            })
            await page.locator('#promtButton').click();
            await expect(page.locator('#promptResult')).toBeVisible();
            await expect(page.locator('#promptResult')).toHaveText('You entered Tu Quoc Tuan');
        })
    })
})