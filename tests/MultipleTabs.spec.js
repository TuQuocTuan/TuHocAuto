import { test, expect } from '@playwright/test';

test.describe('Multiple Tabs', () => {
    test('Mở nhiều Tab', async ({ page, context }) => {
        await test.step('1. Mở tab mới', async () => {
            await page.goto('https://demoqa.com/browser-windows');
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                page.locator('#tabButton').click()
            ])
            await expect(newPage).toHaveURL('https://demoqa.com/sample');
            await expect(newPage.locator('#sampleHeading')).toHaveText('This is a sample page');
        })

        await test.step('2.Mở window mới', async () => {
            const [newWindow] = await Promise.all([
                context.waitForEvent('page'),
                page.locator('#windowButton').click()
            ])
            await expect(newWindow.locator('#sampleHeading')).toContainText('This is a sample page');
        })
    })
})