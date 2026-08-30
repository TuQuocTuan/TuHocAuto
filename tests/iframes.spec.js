import { test, expect } from '@playwright/test';

test.describe('Iframe', () => {
    test('iFrame single', async ({ page }) => {
        await test.step('test', async () => {
            await page.goto('https://demoqa.com/frames');
            const frame = await page.frameLocator('#frame1');
            const header = await frame.locator('#sampleHeading');
            await expect(header).toContainText('This is a sample page');
            const frame2 = await page.frameLocator('#frame2');
            const header2 = await frame2.locator('#sampleHeading');
            await expect(header2).toContainText('This is a sample page');
        })
    })
})